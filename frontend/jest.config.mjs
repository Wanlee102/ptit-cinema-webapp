// jest.config.mjs
import { defaults } from "jest-config";

export default {
  preset: "ts-jest/presets/default-esm", // Use ESM preset
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TS files as ESM
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Handle path aliases (if any)
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        useESM: true, // Enable ESM support in ts-jest
        tsconfig: "tsconfig.json", // Point to your TS config
      },
    ],
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"], // Include TS extensions
};
