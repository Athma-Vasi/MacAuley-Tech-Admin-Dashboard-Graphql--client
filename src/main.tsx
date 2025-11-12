import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RelayEnvironmentProvider } from "react-relay";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/authProvider/AuthProvider.tsx";
import { GlobalProvider } from "./context/globalProvider/GlobalProvider.tsx";
import { relayEnvironment } from "./environment.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <Suspense fallback={"Loading..."}>
                  <App />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  </RelayEnvironmentProvider>,
  // </StrictMode>,
);
