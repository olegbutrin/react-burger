import { websocketReducer, initialState } from "./websocket";
import * as constants from "../constants/websocket";

describe("Websocket reducer", () => {
  it("Should return initial state", () => {
    expect(websocketReducer(initialState, { type: "test" })).toEqual(
      initialState
    );
  });

  it("Should set success connection", () => {
    expect(
      websocketReducer(initialState, {
        type: constants.WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      connected: true,
      refused: false,
    });
  });

  it("Should set refused connection", () => {
    expect(
      websocketReducer(initialState, {
        type: constants.WS_CONNECTION_REFUSED,
      })
    ).toEqual({
      ...initialState,
      connected: false,
      refused: true,
    });
  });

  it("Should set close connection info", () => {
    expect(
      websocketReducer(initialState, {
        type: constants.WS_CONNECTION_CLOSED,
        payload: "Error message",
      })
    ).toEqual({
      ...initialState,
      error: "Error message",
      connected: false,
    });
  });

  it("Should set error connection info", () => {
    expect(
      websocketReducer(initialState, {
        type: constants.WS_CONNECTION_ERROR,
        payload: "Error message",
      })
    ).toEqual({
      ...initialState,
      error: "Error message",
      connected: false,
    });
  });

  it("Should append message", () => {
    expect(
      websocketReducer(initialState, {
        type: constants.WS_GET_MESSAGE,
        payload: "Server message",
      })
    ).toEqual({
      ...initialState,
      messages: ["Server message"],
    });
  });

  it("Should append another message", () => {
    expect(
      websocketReducer(
        { ...initialState, messages: ["Server message"] },
        {
          type: constants.WS_GET_MESSAGE,
          payload: "Another server message",
        }
      )
    ).toEqual({
      ...initialState,
      messages: ["Server message", "Another server message"],
    });
  });
});
