import { useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { setFeedType } from "../../services/actions/feed";
import { wsConnect } from "../../services/actions/websocket";

import css from "./profile.module.css";

const UserOrders = () => {
  const dispatch = useDispatch();
  // set feed state
  useEffect(() => {
    dispatch(setFeedType("user"));
    dispatch(wsConnect());
  }, [dispatch]);
  return <div className={css.profileOrders}>ORDER LIST</div>;
};

export default UserOrders;
