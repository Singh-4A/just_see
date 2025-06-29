import React, { Suspense } from "react";
import { StrictMode } from "react";
import { SnackbarProvider } from 'notistack';

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContextApi } from "./contextapi/contextApi.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import DoctorApp from "./doc/doctor.jsx";
import { BrowserRouter } from "react-router-dom";

// import ErrorBoundary from "./errorBoundary/ErrorBoundary.jsx";
const ErrorBoundary = React.lazy(() =>
  import("./errorBoundary/ErrorBoundary.jsx")
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ContextApi>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <BrowserRouter>
            <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
              <StrictMode>
                <App />
                {/* <DoctorApp/> */}
              </StrictMode>
            </SnackbarProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </Suspense>
    </ContextApi>
  </Provider>
);
