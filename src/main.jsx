import React, { Suspense } from "react";
import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import ErrorBoundary from "./errorBoundary/ErrorBoundary.jsx";
const ErrorBoundary = React.lazy(() => import('./errorBoundary/ErrorBoundary.jsx'));

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<div>Loading...</div>}>
  <ErrorBoundary>
    <StrictMode>
      <App />
    </StrictMode>
  </ErrorBoundary>
</Suspense>
 
);
