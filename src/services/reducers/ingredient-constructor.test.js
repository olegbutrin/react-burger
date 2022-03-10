import { constructorReducer, initialState } from "./ingredient-constructor";
import * as constants from "../constants/ingredient-constructor";

describe("Constructor reducer", () => {
  it("Should return initial state", () => {
    expect(constructorReducer(initialState, { type: "test" })).toEqual(
      initialState
    );
  });

  it("Should add a bun", () => {
    expect(
      constructorReducer(initialState, {
        type: constants.SET_BURGER_BUN,
        payload: "60d3b41abdacab0026a733d1",
      })
    ).toEqual({
      ...initialState,
      bun: "60d3b41abdacab0026a733d1",
    });
  });

  it("Should add the ingredient", () => {
    expect(
      constructorReducer(initialState, {
        type: constants.ADD_BURGER_PRODUCT,
        payload: { item: { _id: "60d3b41abdacab0026a733c6" }, index: "1" },
      })
    ).toEqual({
      ...initialState,
      products: [{ _id: "60d3b41abdacab0026a733c6", index: "1" }],
    });
  });

  it("Should add another ingredient", () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          products: [{ _id: "60d3b41abdacab0026a733c6", index: "1" }],
        },
        {
          type: constants.ADD_BURGER_PRODUCT,
          payload: { item: { _id: "60d3b41abdacab0026a733cd" }, index: "2" },
        }
      )
    ).toEqual({
      ...initialState,
      products: [
        { _id: "60d3b41abdacab0026a733cd", index: "2" },
        { _id: "60d3b41abdacab0026a733c6", index: "1" },
      ],
    });
  });

  it("Should swap ingredients", () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          products: [
            { _id: "60d3b41abdacab0026a733cd", index: "2" },
            { _id: "60d3b41abdacab0026a733c6", index: "1" },
          ],
        },
        {
          type: constants.SWAP_BURGER_PRODUCTS,
          payload: {
            source: { _id: "60d3b41abdacab0026a733c6", index: "1" },
            dest: { _id: "60d3b41abdacab0026a733cd", index: "2" },
          },
        }
      )
    ).toEqual({
      ...initialState,
      products: [
        { _id: "60d3b41abdacab0026a733c6", index: "1" },
        { _id: "60d3b41abdacab0026a733cd", index: "2" },
      ],
    });
  });

  it("Should remove ingredient", () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          products: [
            { _id: "60d3b41abdacab0026a733cd", index: "2" },
            { _id: "60d3b41abdacab0026a733c6", index: "1" },
          ],
        },
        {
          type: constants.REMOVE_BURGER_PRODUCT,
          payload: { _id: "60d3b41abdacab0026a733c6", index: "1" },
        }
      )
    ).toEqual({
      ...initialState,
      products: [{ _id: "60d3b41abdacab0026a733cd", index: "2" }],
    });
  });

  it("Should remove all ingredient", () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          bun: "60d3b41abdacab0026a733d1",
          products: [
            { _id: "60d3b41abdacab0026a733cd", index: "2" },
            { _id: "60d3b41abdacab0026a733c6", index: "1" },
          ],
        },
        {
          type: constants.CLEAR_BURGER_PRODUCTS,
        }
      )
    ).toEqual(initialState);
  });
});
