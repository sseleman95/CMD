const { TEST_HOST } = require('./test/config/server.js');

const sharedConfig = {
  errorOnDeprecated: true,
  globalSetup: './test/config/jest.setup.js',
  globalTeardown: './test/config/jest.teardown.js',
  resetModules: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/test/config/jest.setup-tests.js'],
  testEnvironment: 'jsdom',
  testURL: `${TEST_HOST}/_blank.html`,
};

module.exports = {
  template: './ssr.html',
  maxAge: 60 * 60 * 1000, // lru-cache config
  config: {
    // docsify config
  },
  projects: [
    // Unit Tests
    {
      displayName: 'unit',
      ...sharedConfig,
      testMatch: ['<rootDir>/test/unit/*.test.js'],
    },
    // Integration Tests
    {
      displayName: 'integration',
      ...sharedConfig,
      testMatch: ['<rootDir>/test/integration/*.test.js'],
    },
  ],
};
