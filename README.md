# Full Stack Engineer Assessment

## Tech Stack
* Programming language: NodeJS/Typescript
* Framework: [NestJs](https://nestjs.com/)
  * Why NestJs? In my humble opinion nestjs provides
  a bunch of tools needed to develop scalable and resilient
  node.js applications, such Typescript setup, Testing(unit & E2E),
  Dependency Injection, Organization by modules, Event-driven programming, 
  Caching, Error handler, Open Api generation from DTOs, among others.
* Other tools:
  * Prettier: code formatter
  * Linter: Organize and set rules on our code, for instance import only with absolute path.
  * Testing: 
    * Unit: Jest
    * E2E: supertest (provided by the framework in the scaffolding)
* Project structure:
  * I tried to apply a clean architecture using modules and a hexagonal approach 
  (ports & adapters) splitting it into the following layers::
  * ``courier.module``
    * ``application``: 
      * ``use-cases``: Here we will have our use cases that perform the actions (create, update, lookup, etc.).
      * ``port``: This is the contract that our use cases will use to execute the
      persistence operations and thanks to the dependency injection we will 
      use a contract/abstraction instead of the implementation.
    * ``domain``: Here is located our entity with our business rules. You
    could see a couple of methods such as ``addCapacity``, ``setCapacity``.
    * ``infrastructure``:
      * ``persistence/adapter``: Here there is the implementation
      of our port in order to store and retrieve the entities. We could have
      different adapters and use each them for certain use cases. We also have a feed file
      ``src/courier/infrastructure/persistence/adapter/couriers.json`` that will be loaded
      when the module is initialized.
      * ``controllers``
        * ``rest``: This folder contains our rest controllers. It has the rest name because our api could have
        different interaction with the exterior world such as event driven, command, etc. I created
        a dedicated file for each controller looking the single responsibility from the SOLID principles.
        * ``dto``: In this folder we've the DTOs (data transfer objects) that we will be used by our endpoints 
        with some validation on the high level. The DTOs are data classes with primitive values, and they 
        should not have any business logic neither perform any operations. 
  * ``health``: This module contains a single health endpoint to know if our
  application started successfully. This endpoint is more usefully than we though, for
  instance when our application is deployed we could have some dashboard in Grafana 
  that will check our application status calling this endpoint.
  * ``error-handler``: This is a single class with a powerful feature that NestJs
  provide us to handle all errors that could occur in our application in one place.
  * ``middlewares``: This file contains our global middleware to add a request id to identify each request if we need to trace
  our response time, errors in some dashboard, etc. And a request startTime property to calculate
  the response time.
  * ``interceptors``: This is another feature that NestJs offer to intercept the requests,
  and here we are able to log the request details. You might be answering, then why the 
  request id and the startTime are not performed here? the simple answer is due the
  [NestJs Request lifecycle](https://docs.nestjs.com/faq/request-lifecycle#summary) that in this case is like:
  Global middleware &rarr; Global interceptor &rarr; ... request processing ... &rarr; Global Response interceptor &rarr ...
  * ``app.module``: This is the main module, which will be used by nestjs to set up the application.
  * ``main.ts``: This is the main file where we've to put some global settings and where we define
  how our application will work.
        

---
## Main Goal
_Write an API that will be queried by two services: the Stuart API and the Dispatcher._

_The Stuart API will need to keep in sync the list of Couriers in the platform as well as their max capacity (in liters)_.

```
curl -X POST http://localhost:3000/couriers --data '
{
"id": 1234,
"max_capacity": 45
}'
```

_The Dispatcher will need to query this API to find out which couriers do have available space._
```
curl -X GET http://localhost:3000/couriers/lookup --data '
{
"capacity_required": 45
}'
```
### Resolution
* [X] POST endpoint ``localhost:3000/couriers``
* [X] GET endpoint ``localhost:3000/couriers/lookup/capacity-required/:capacity``
  * In the goal reflect the data as a body payload, but using the HTTP method GET
  is not recommend sending a body. For this scenario, we can this as a path parameter. 
  [Technical info](https://www.baeldung.com/http-get-with-body)

---

## Bonus Goals:
**In case you are feeling going deeper, here are some proposed bonus goals. Pick any that you want or add your own.**

* Courier capacities vary as they pick and deliver packages. Allow the API to update a courier's available capacity at any moment as they are assigned new packages. 
  * Yes, there are other endpoints such as:
    * POST ``localhost:3000/couriers/:id/reset-capacity``
      * This endpoint set the courier capacity to 0.
    * POST ``localhost:3000/couriers/:id/increase-capacity``
      * This endpoint increase the current capacity adding the received amount (current_capacity + capacity_received)
    * PATCH ``localhost:3000/couriers/:id/update-capacity``
      * This endpoint update the courier capacity with the amount received.
      * Why PATCH? Because we're partially updating the courier, in this case it's only their capacity,
        but let's imagine we've other details of the courier such as name, address, among others.
        
    * GET ``localhost:3000/couriers/:id``
      * This endpoint will ve the availability to check the data of a courier by their id,
      and check that the operations has been applied successfully.

* We plan to run this service in the AWS environment. Prepare this API to be deployed.
  * I added some GitHub actions such as:
    * ``style-ci-pipeline.yml``: It runs a script to ensure our code is properly formatted.
    * ``unit-ci-pipeline.yml``: It runs a script to ensure that our unit test are working properly.
    * ``deploy.yaml``: this action will deploy the app to AWS EC2 instance when it's already configured.
    Usually, this setup is done by a dedicated DevOps using IaC such as Terraform.
* Come up with a smart and scalable output schema that is future-proof. Explain why you think it is so.
  * [There is a small pdf document with a brief explanation(./smart-and-scalable-output-schema.pdf)](./smart-and-scalable-output-schema.pdf)
* How about race conditions? To avoid race conditions when a lookup is being executed and a capacity update comes, the most understandable 
approach is to lock the access to ensure that persistence access is performed sequentially, and not in parallel. This can be achieved using simple 
locks or distributed locks, depending on the specific requirements of our use case. We could either develop our own lock strategy or rely on a proven external library. 
It is essential to use abstractions so that we can easily switch to another library or implement our solution without risking the integrity of our codebase.
  
---

### Notes

* **How do we run this API? Please provide the right amount of documentation in any format you prefer.**
  * The application is dockerized, so the fastest and reliable way is running one the following commands:
    * Using docker-compose(recommended): 
    ```shell
    docker-compose up --build
    ```
    * using docker:
    ```shell
    docker build -t withdockerbuild . && docker run --env-file .env withdockerbuild
    ```
  * If you want to run manually without docker, ensure you have Node > 18.4 and npm in your machine,
  and run the following scripts
    * Local and dev: 
    ```shell
    npm run start:dev
    ```
    * Build to deploy:
    ```shell
    npm run prebuild
    ``` 
    ```shell
    npm run build
    ``` 
    ```shell
    npm run start
    ``` 
* **Show off! We love TDD. We love unit tests. We love design patterns. We love engineering!**
  * Unit testing: There are some tests for the use cases located in the following path ``test/*``
    * Scripts to run the unit tests:
      * Without coverage:
        ```shell
            npm run test:unit
        ```
      * With coverage:
        ```shell
            npm run test:cov
        ```
  * E2E testing: I'd like to have more time to drive the E2E testing deeply. These are
  the endpoints tested by E2E:
    * GET ``/health`` endpoint in order to check if the application started successfully
    * GET ``/couriers/lookup/capacity-required/50`` to check the retrieval but the seed file.
    * POST ``/couriers`` to create a courier.
    The E2E tests can be launched with the following script
  * With coverage:
    ```shell
    npm run test:e2e
    ```
  * TDD: I would love to adopt TDD as well, but for this assessment maybe does not make sense
  since TDD is used for continuous development. We could use Cucumber to write scenarios and features
  in the most descriptive manner.
  * Design Patterns:
    * By the nature of the assignment I was not able to develop different design patterns, but there are a couple that came to my mind:
      * Factory pattern: It's belongs to the creation patterns. I created a named constructor to create a courier avoiding instantiating directly
      because we could hide some logic in the constructor.
      * Command pattern: It's belongs to the behavioural patterns. We can see in the all use cases they implement an interface
      enforcing that classes to behave implementing a specific method.
* **If you were to have more time, what would you do? Briefly explain what could be improved**.
  * Use a real database instead of an in-memory one and implement a system to prevent race conditions.
  * Perform extra validations, for instance, if we receive a negative number to update the courier capacity,
    it depends on the business logic, but at least if we will accept negative numbers, check that the final capacity is not less than 0.
  * Set up authentication, at least using JWT, but it's more secure to use keycloak for instance.
  * Create the API documentation. Depending on the project, working with API-first, the documentation should be
    written before starting the coding, so we can share this documentation with other teams that are going to use our API,
    stakeholders, among others.
  * Create custom business errors and match the status in the global error handling, because
    we could create our own business logic and response structure, being less coupled with the framework.
  * Use kafka as message broker to publish domain events to a queue.
  * Add metrics using Prometheus, such as a histogram to trace the request duration, counters to know if there are some leaks.
  * Add a dashboard to visualize the logs using for instance ELK.
  * Meaningful domain entity which has a few more attributes, including dates such as ``createdAt`` and ``updatedAt``.
  * Add code formatter and code checker before commit using husky.

---

## Conclusion

In conclusion, I thoroughly enjoyed taking on this technical challenge. 
It provided a great opportunity for me to demonstrate my skills and approach to problem-solving. 
The challenge was simple and effective in assessing how I think and work, and it allowed me to 
showcase my best efforts in addressing the requirements.

I genuinely enjoyed the experience and the chance to engage with your team's assessment. 
I look forward to having further conversations and learning more about the exciting work your company is doing. 
If you have any additional feedback or questions regarding my submission, 
I'd be more than happy to discuss them.

Thank you for this wonderful opportunity, and I hope to hear from you soon!

Best regards,
Manuel Leon.
  
  