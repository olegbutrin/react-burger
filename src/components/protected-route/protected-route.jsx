import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { useUserStatus } from "../../services/user";

import { PTUserLevel } from "../../utils/props";

// защищенный маршрутизатор
const ProtectedRoute = (props) => {
  const { isConnected, isNotConnected, isNotRegister } = useUserStatus();
  const from = props?.location?.state?.from || null;

  return (
    <>
      {isConnected && props.level === "authorized" && props.children}

      {isConnected && props.level === "registered" && from && (
        <Redirect to={{ pathname: from, state: { from: from } }} />
      )}

      {isConnected && props.level === "registered" && !from && (
        <Redirect to={{ pathname: "/logout", state: { from: props.path } }} />
      )}

      {isNotConnected && props.level === "registered" && props.children}

      {isNotConnected && props.level === "authorized" && (
        <Redirect to={{ pathname: "/login", state: { from: props.path } }} />
      )}

      {isNotRegister && (
        <Redirect to={{ pathname: "/register", state: { from: props.path } }} />
      )}
    </>
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  level: PTUserLevel.isRequired,
};

export default ProtectedRoute;
