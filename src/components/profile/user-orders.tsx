import { useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { setFeedType } from "../../services/actions/feed";
import { wsConnect, wsDisconnect } from "../../services/actions/websocket";
import Ticket from "../ticket/ticket";

import css from "./profile.module.css";
import { Link, useLocation } from "react-router-dom";
import { reconnectUser } from "../../services/actions/auth";

const UserOrders = () => {
  const dispatch = useDispatch();
  // set feed state
  useEffect(() => {
    dispatch(setFeedType("user"));
    dispatch(wsConnect());
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const { refused } = useSelector((store) => store.socket);

  useEffect(() => {
    if (refused) {
      dispatch(reconnectUser());
      dispatch(wsConnect());
    }
  }, [dispatch, refused]);

  const { tickets, type } = useSelector((store) => store.feed);

  const location = useLocation();

  return (
    <div className={css.profileOrders + " custom-scroll"}>
      {type === "user" &&
        tickets.map((ticket) => {
          return (
            <Link
              key={`Ticket_user_${ticket._id}`}
              to={{
                pathname: `/profile/orders/${ticket.number}`,
                state: { background: location },
              }}
              className={css.routeLink}
            >
              <Ticket ticketData={ticket} tickedType={"user"} />
            </Link>
          );
        })}
    </div>
  );
};

export default UserOrders;
