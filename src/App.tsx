import { Toaster } from "sonner"; // Use for Toasts
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { QueryProvider } from "@/providers/query-provider";

import { persistor, store } from "@/store/store";

import { Home } from "@pages/home";
import { Login } from "@pages/login";
import { NotFound } from "@pages/not-found";
import { ErrorBoundary } from "@pages/error";
import { PrivateRoutes, PublicRoutes } from "@pages/auth";

import "@/App.css";

// !Better To Use Some Small Size Library For Local State Manager Like Zustand Instead Of Redux

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryProvider>
          <ErrorBoundary>
            <BrowserRouter>
              <Toaster />
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path="/home" element={<Home />} />
                </Route>
                <Route element={<PublicRoutes />}>
                  <Route path="/" element={<Login />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </QueryProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
