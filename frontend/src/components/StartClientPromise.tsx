import { Await, RouterProvider } from "@tanstack/react-router";
import type { AnyRouter } from "@tanstack/router-core";
import { hydrate } from "@tanstack/start-client-core";
import { type createStore, Provider } from "jotai";

let hydrationPromise: Promise<void | Array<Array<void>>> | undefined;

export function 
tartClientPromise(props: {
  router: AnyRouter;
  store: ReturnType<typeof createStore>;
  onResolved?: () => void;
}) {
  if (!hydrationPromise) {
    hydrationPromise = Promise.resolve();

    if (!props.router.state.matches.length) {
      hydrationPromise = hydrate(props.router);
    }

    hydrationPromise.then(props.onResolved);
  }

  return (
    <Await
      promise={hydrationPromise}
      children={() => (
        <Provider store={props.store}>
          <RouterProvider router={props.router} />
        </Provider>
      )}
    />
  );
}
