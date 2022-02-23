import { useEffect } from "react";
import { useDispatch } from "../../utils/hooks";
import { setFeedType } from "../../services/actions/feed";
import { wsConnect, wsDisconnect } from "../../services/actions/websocket";
import css from "../pages.module.css";

const FeedPage = () => {
  const dispatch = useDispatch();
  // Логика работы с лентой заказов:
  // 1. При монтировании компонента или страницы происходит перезапуск сокета на нужный фид (общий или пользователя)
  // 2. При размонтировании компонента сокет закрывается
  useEffect(() => {
    dispatch(setFeedType("all"));
    dispatch(wsConnect());
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <div className={css.container + " pt-20"}>
        <p className="text text_type_main-standard">feed</p>
      </div>
    </div>
  );
};

export default FeedPage;
