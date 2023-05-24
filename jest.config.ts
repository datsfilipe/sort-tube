export default {
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false,
            decorators: true,
          },
          target: "esnext",
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: "esnext",
          noInterop: false,
        },
      },
    ],
  },
};
