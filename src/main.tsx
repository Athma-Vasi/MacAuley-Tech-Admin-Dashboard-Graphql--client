import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RelayEnvironmentProvider } from "react-relay";
import App from "./App.tsx";
import { relayEnvironment } from "./environment.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <StrictMode>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Suspense fallback={"Loading..."}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  </StrictMode>,
);
