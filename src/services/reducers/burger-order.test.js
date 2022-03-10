import { orderReducer, initialState } from "./burger-order";
import * as constants from "../constants/burger-order";

describe("Burger order reducer", () => {
  it("Should return initial state", () => {
    expect(orderReducer(initialState, { type: "test" })).toEqual(initialState);
  });

  it("Should change get order request status with initiate order", () => {
    expect(
      orderReducer(initialState, {
        type: constants.GET_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });

  it("Should change get order failed status with order failed", () => {
    expect(
      orderReducer(initialState, {
        type: constants.GET_ORDER_FAILED,
      })
    ).toEqual({
      ...initialState,
      orderFailed: true,
    });
  });

  it("Should change get order with order success", () => {
    expect(
      orderReducer(initialState, {
        type: constants.GET_ORDER_SUCCESS,
        payload: {
          name: "Фантастический космический бургер",
          order: { number: "333333" },
          success: true,
        },
      })
    ).toEqual({
      ...initialState,
      order: {
        name: "Фантастический космический бургер",
        order: { number: "333333" },
        success: true,
      },
      orderRequest: false,
      orderFailed: false,
    });
  });

  it("Should to clear order data", () => {
    expect(
      orderReducer(initialState, {
        type: constants.CLEAR_ORDER_DATA,
      })
    ).toEqual(initialState);
  });
});
