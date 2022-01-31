import { Redirect, Route } from "react-router";
import { useUserStatus } from "../../services/user";

// защищенный маршрутизатор
function ProtectedRoute({ children, ...rest }) {
  const { isAuthenticated } = useUserStatus();
  return (
    <Route
      {...rest}
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
