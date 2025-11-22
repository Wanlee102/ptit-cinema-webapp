import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

export function NotFound({ children }: PropsWithChildren) {
  return (
    <div className="space-y-2 p-2">
      <div className="text-gray-600 dark:text-gray-400">
        {children || <p>Page Not Found</p>}
      </div>
      <p className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded bg-emerald-500 px-2 py-1 font-black text-primary-foreground text-sm uppercase"
        >
          Go Back
        </button>
        <Link
          to="/"
          className="rounded bg-cyan-600 px-2 py-1 font-black text-primary-foreground text-sm uppercase"
        >
          Start Over
        </Link>
      </p>
    </div>
  );
}
