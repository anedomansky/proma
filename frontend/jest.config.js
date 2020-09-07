module.exports = {
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.ts',
    ],
    // needed to access the @testing-library/jest-dom methods like expect(container).toBeInTheDocument();
    testEnvironment: 'jest-environment-jsdom-fourteen',
    moduleNameMapper: {
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': "<rootDir>/src/__mocks__/fileMock.js",
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy', // needed so jest can understand import './App.scss'-like webpack imports
    },
};
