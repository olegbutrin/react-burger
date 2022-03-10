import { feedReducer, initialState } from "./feed";
import * as constants from "../constants/feed";

describe("Feed reducer", () => {
  it("Should return initial state", () => {
    expect(feedReducer(initialState, { type: "test" })).toEqual(initialState);
  });

  it("Should change feed type", () => {
    expect(
      feedReducer(initialState, {
        type: constants.FEED_SET_TYPE,
        payload: "user",
      })
    ).toEqual({
      ...initialState,
      type: "user",
    });
  });

  it("Should change feed data", () => {
    expect(
      feedReducer(initialState, {
        type: constants.FEED_RECEIVE_ORDERS,
        payload: { tickets: [], total: 1000, totalToday: 100 },
      })
    ).toEqual({
      ...initialState,
      tickets: [],
      total: 1000,
      totalToday: 100,
    });
  });
});
