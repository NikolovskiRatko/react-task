export default {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/\\.next/",
    "<rootDir>/apps/.*/\\.next/",
    "<rootDir>/apps/.*/.next/standalone/",
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/apps/.*/.next/standalone/"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
