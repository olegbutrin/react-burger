import { useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { setFeedType } from "../../services/actions/feed";
import { wsConnect, wsDisconnect } from "../../services/actions/websocket";
import { Link, useLocation } from "react-router-dom";
import Ticket from "../../components/ticket/ticket";

import css from "../feed/feed.module.css";
import { FeedStatus } from "../../utils/types";

const FeedPage = () => {
  const dispatch = useDispatch();
  // set feed state
  useEffect(() => {
    dispatch(setFeedType("all"));
    dispatch(wsConnect());
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const { tickets, type, total, totalToday } = useSelector((store) => store.feed);

  const ticketsDone: Array<number> = tickets
    .filter((ticket) => {
      return ticket.status === FeedStatus.DONE;
    })
    .map((ticket) => {
      return ticket.number;
    });

  const ticketsPending: Array<number> = tickets
    .filter((ticket) => {
      return ticket.status === FeedStatus.PENDING;
    })
    .map((ticket) => {
      return ticket.number;
    });

  const location = useLocation();

  return (
    <>
      <section className={css.sectionLeft + " mr-5 ml-5"}>
        <div className={"mt-10 mb-6"}>
          <p className="text text_type_main-large">Лента заказов:</p>
        </div>
        <div className={css.profileOrders + " custom-scroll"}>
          {type === "all" &&
            tickets.map((ticket) => {
              return (
                <Link
                  key={`Ticket_all_${ticket._id}`}
                  to={{
                    pathname: `/feed/${ticket.number}`,
                    state: { background: location },
                  }}
                  className={css.routeLink}
                >
                  <Ticket ticketData={ticket} tickedType={"all"} />
                </Link>
              );
            })}
        </div>
      </section>
      <section className={css.sectionRight + " mr-5 ml-15"}>
        <div className={css.fullRow + " mt-30"}>
          <div className={css.rowContainer}>
            <p className="text text_type_main-medium">Готовы:</p>
            <div className={css.numbersList + " mt-6"}>
              {ticketsDone.map((ticketNum) => {
                return (
                  <Link
                    key={`Ticket_all_done_${ticketNum}`}
                    to={{
                      pathname: `/feed/${ticketNum}`,
                      state: { background: location },
                    }}
                    className={css.routeLink}
                  >
                    <p
                      className={"text text_type_main-default " + css.done}
                    >{`#${ticketNum}`}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={css.rowContainer + " ml-9"}>
            <p className="text text_type_main-medium">Готовятся:</p>
            <div className={css.numbersList + " mt-6"}>
            {ticketsPending.map((ticketNum) => {
                return (
                  <Link
                    key={`Ticket_all_pending_${ticketNum}`}
                    to={{
                      pathname: `/feed/${ticketNum}`,
                      state: { background: location },
                    }}
                    className={css.routeLink}
                  >
                    <p
                      className={"text text_type_main-default"}
                    >{`#${ticketNum}`}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </section>
    </>
  );
};

export default FeedPage;
