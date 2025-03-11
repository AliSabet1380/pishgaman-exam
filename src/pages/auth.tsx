import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const { token } = useSelector((state: RootState) => state.token);

  return token ? <Outlet /> : <Navigate to={"/"} />;
};

export const PublicRoutes = () => {
  const { token } = useSelector((state: RootState) => state.token);

  return !token ? <Outlet /> : <Navigate to={"/home"} />;
};
