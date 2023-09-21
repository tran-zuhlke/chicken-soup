"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/../test/setupEnvVars.ts'],
    setupFilesAfterEnv: ['<rootDir>/../test/setupTests.ts'],
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map