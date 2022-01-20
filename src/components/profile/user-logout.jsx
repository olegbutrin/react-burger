import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/actions/auth";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const UserLogout = () => {

  const dispatch = useDispatch();

  const logout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <Button type="primary" size="medium" onClick={logout}>
      Выход
    </Button>
  );
};

export default UserLogout;
