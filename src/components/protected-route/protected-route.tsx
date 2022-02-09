import { FC } from "react";
import { Redirect, Route, } from "react-router";
import { useUserStatus } from "../../services/user";

import { TProtectedRoute } from "../../utils/types";

// защищенный маршрутизатор
const  ProtectedRoute: FC<TProtectedRoute> = ({ children, ...path }) => {
  const { isAuthenticated } = useUserStatus();
  return (
    <Route
      {...path}
      render={({ location }) => {
        return isAuthenticated === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location.pathname },
            }}
          />
        );
      }}
    />
  );
}

export default ProtectedRoute;
