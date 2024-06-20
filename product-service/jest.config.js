module.exports = {
  verbose: true,
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/infrastructure'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
