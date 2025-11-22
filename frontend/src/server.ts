import {
  createStartHandler,
  defaultStreamHandler,
  getWebRequest,
} from "@tanstack/react-start/server";
import { createRouter } from "./router";

export default createStartHandler({
  createRouter: () => createRouter(getWebRequest().url),
})((event) =>
  defaultStreamHandler(event),
);
