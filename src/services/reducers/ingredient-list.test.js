import { ingredientsReducer, initialState } from "./ingredient-list";
import * as constants from "../constants/ingredient-list";

describe("Ingredients reducer", () => {
  it("Should return initial state", () => {
    expect(ingredientsReducer(initialState, { type: "test" })).toEqual(
      initialState
    );
  });

  it("Should set reguest state", () => {
    expect(
      ingredientsReducer(initialState, {
        type: constants.GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      ingredientRequest: true,
    });
  });

  it("Should set ingredients", () => {
    expect(
      ingredientsReducer(initialState, {
        type: constants.GET_INGREDIENTS_SUCCESS,
        payload: [
          {
            _id: "60666c42cc7b410027a1a9bb",
            name: "Хрустящие минеральные кольца",
            type: "main",
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
            __v: 0,
          },
          {
            _id: "60666c42cc7b410027a1a9ba",
            name: "Соус с шипами Антарианского плоскоходца",
            type: "sauce",
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: "https://code.s3.yandex.net/react/code/sauce-01.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/sauce-01-large.png",
            __v: 0,
          },
        ],
      })
    ).toEqual({
      ...initialState,
      ingredients: [
        {
          _id: "60666c42cc7b410027a1a9bb",
          name: "Хрустящие минеральные кольца",
          type: "main",
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
          __v: 0,
        },
        {
          _id: "60666c42cc7b410027a1a9ba",
          name: "Соус с шипами Антарианского плоскоходца",
          type: "sauce",
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: "https://code.s3.yandex.net/react/code/sauce-01.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/sauce-01-large.png",
          __v: 0,
        },
      ],
      ingredientRequest: false,
      ingredientFailed: false,
    });
  });

  it("Should set reguest state with error", () => {
    expect(
      ingredientsReducer(initialState, {
        type: constants.GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...initialState,
      ingredientRequest: false,
      ingredientFailed: true,
    });
  });
});
