import { orderDetailsReducer, initialState } from "./order";
import * as constants from "../constants/order";

describe("Order details reducer", () => {
  it("Should return initial state", () => {
    expect(orderDetailsReducer(initialState, { type: "test" })).toEqual(
      initialState
    );
  });

  it("Should set reguest state", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: constants.ORDER_DETAILS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("Should set order info if success", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: constants.ORDER_DETAILS_SUCCESS,
        payload: {
          success: true,
          name: "Space сокращенный бургер",
          order: {
            ingredients: [
              {
                _id: "60d3b41abdacab0026a733c9",
                name: "Мясо бессмертных моллюсков Protostomia",
                type: "main",
                proteins: 433,
                fat: 244,
                carbohydrates: 33,
                calories: 420,
                price: 1337,
                image: "https://code.s3.yandex.net/react/code/meat-02.png",
                image_mobile:
                  "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                image_large:
                  "https://code.s3.yandex.net/react/code/meat-02-large.png",
                __v: 0,
              },
              {
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile:
                  "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large:
                  "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
              },
            ],
            _id: "6223e24425b9a4001b6e2d32",
            owner: {
              name: "oleg butrin",
              email: "olegbutrin@gmail.com",
              createdAt: "2022-01-14T21:33:56.334Z",
              updatedAt: "2022-03-03T06:51:04.176Z",
            },
            status: "done",
            name: "Space сокращенный бургер",
            createdAt: "2022-03-05T22:20:52.811Z",
            updatedAt: "2022-03-05T22:20:53.251Z",
            number: 11149,
            price: 8027,
          },
        },
      })
    ).toEqual({
      ...initialState,
      order: {
        success: true,
        name: "Space сокращенный бургер",
        order: {
          ingredients: [
            {
              _id: "60d3b41abdacab0026a733c9",
              name: "Мясо бессмертных моллюсков Protostomia",
              type: "main",
              proteins: 433,
              fat: 244,
              carbohydrates: 33,
              calories: 420,
              price: 1337,
              image: "https://code.s3.yandex.net/react/code/meat-02.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/meat-02-large.png",
              __v: 0,
            },
            {
              _id: "60d3b41abdacab0026a733c6",
              name: "Краторная булка N-200i",
              type: "bun",
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: "https://code.s3.yandex.net/react/code/bun-02.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/bun-02-large.png",
              __v: 0,
            },
          ],
          _id: "6223e24425b9a4001b6e2d32",
          owner: {
            name: "oleg butrin",
            email: "olegbutrin@gmail.com",
            createdAt: "2022-01-14T21:33:56.334Z",
            updatedAt: "2022-03-03T06:51:04.176Z",
          },
          status: "done",
          name: "Space сокращенный бургер",
          createdAt: "2022-03-05T22:20:52.811Z",
          updatedAt: "2022-03-05T22:20:53.251Z",
          number: 11149,
          price: 8027,
        },
      },
    });
  });

  it("Should set reguest state with error", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: constants.ORDER_DETAILS_ERROR,
      })
    ).toEqual({
      ...initialState,
      request: false,
      order: null,
    });
  });
});
