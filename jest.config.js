module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
};
