import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import NotFound from "~/routes/404_.not-found"; // 👈 Your custom 404 component
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// ✅ ErrorBoundary (modern way)
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <NotFound />
      );
    }

    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-center p-10">
          <div>
            <h1 className="text-4xl font-bold text-red-600">
              {error.status} {error.statusText}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {error.data || "Something went wrong."}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Unexpected JS error fallback
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center text-center p-10">
        <div>
          <h1 className="text-4xl font-bold text-red-600">Application Error</h1>
          <p className="mt-4 text-lg text-gray-600">
            {(error as Error).message || "An unexpected error occurred."}
          </p>
        </div>
      </div>
    </Layout>
  );
}
