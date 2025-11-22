export default defineNitroConfig({
  rollupConfig: {
    onwarn(warning, warn) {
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
        return;
      }

      warn(warning);
    },
    onLog(level, log, handler) {
      if (
        log.code === "MODULE_LEVEL_DIRECTIVE" ||
        log.code === "CIRCULAR_DEPENDENCY"
      ) {
        return;
      }

      handler(level, log);
    },
  },
});
