import { ingrPreviewReducer, initialState } from "./ingredient-preview";
import * as constants from "../constants/ingredient-preview";

describe("Ingredients preview reducer", () => {
  it("Should return initial state", () => {
    expect(ingrPreviewReducer(initialState, { type: "test" })).toEqual(
      initialState
    );
  });

  it("Should set item data", () => {
    expect(
      ingrPreviewReducer(initialState, {
        type: constants.SET_ITEM_DATA,
        payload: {
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
      })
    ).toEqual({
      ...initialState,
      productData: {
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
    });
  });

  it("Should clean item data", () => {
    expect(
      ingrPreviewReducer(initialState, { type: constants.CLEAR_ITEM_DATA })
    ).toEqual(initialState);
  });
});
