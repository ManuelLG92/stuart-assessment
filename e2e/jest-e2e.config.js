module.exports = {
	rootDir: '../.',
	modulePaths: ['<rootDir>'],
	moduleFileExtensions: ['js', 'ts'],
	preset: 'ts-jest',
	clearMocks: true,
	testEnvironment: 'node',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	coveragePathIgnorePatterns: ['<rootDir>/dist/'],
	testMatch: ['<rootDir>e2e/**/*.spec.ts'],
	reporters: ['default'],
	testTimeout: 30000,
};
