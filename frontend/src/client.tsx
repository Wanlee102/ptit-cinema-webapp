import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";

const router = createRouter(window.location.pathname);

import { RouterProvider } from "@tanstack/react-router";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
});
