import React, { Suspense } from "react";
import { StrictMode } from "react";
import { SnackbarProvider } from 'notistack';

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContextApi } from "./contextapi/contextApi.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";

// import ErrorBoundary from "./errorBoundary/ErrorBoundary.jsx";
const ErrorBoundary = React.lazy(() =>
  import("./errorBoundary/ErrorBoundary.jsx")
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ContextApi>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
            <StrictMode>
              <App />
            </StrictMode>
          </SnackbarProvider>

        </ErrorBoundary>
      </Suspense>
    </ContextApi>
  </Provider>
);
