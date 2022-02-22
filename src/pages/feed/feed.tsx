import { useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { setFeedType } from "../../services/actions/feed";
import { wsConnect } from "../../services/actions/websocket";
import css from "../pages.module.css";

const FeedPage = () => {
  const dispatch = useDispatch();
  // set feed state
  useEffect(() => {
    dispatch(setFeedType("all"));
    dispatch(wsConnect());
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
