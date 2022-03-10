import { errorReducer, initialState } from "./error";
import * as constants from "../constants/error";
import { LOGIN_ERROR } from "../constants/auth";

describe("Error reducer", () => {
  it("Should return initial state", () => {
    expect(errorReducer(initialState, { type: "test" })).toEqual(initialState);
  });

  it("Should change error source and message", () => {
    expect(
      errorReducer(initialState, {
        type: LOGIN_ERROR,
        payload: { source: "Testing", message: "Test not passed" },
      })
    ).toEqual({
      ...initialState,
      source: "Testing",
      message: "Test not passed",
    });
  });

  it("Should clear error source and message", () => {
    expect(
      errorReducer(initialState, {
        type: constants.CLEAR_ERROR,
      })
    ).toEqual({
      ...initialState,
    });
  });
});
