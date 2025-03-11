import { Toaster } from "sonner"; // Use for Toasts
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { QueryProvider } from "@/providers/query-provider";

import { persistor, store } from "@/store/store";

import { Home } from "@pages/home";
import { Login } from "@pages/login";
import { PrivateRoutes, PublicRoutes } from "@pages/auth";

import "@/App.css";

// !Better To Use Some Small Size Library For Local State Manager Like Zustand Instead Of Redux

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryProvider>
          <BrowserRouter>
            <Toaster />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Home />} />
              </Route>
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
