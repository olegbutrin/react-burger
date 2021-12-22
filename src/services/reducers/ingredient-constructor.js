import {
  SET_BURGER_BUN,
  ADD_BURGER_PRODUCT,
  REMOVE_BURGER_PRODUCT,
} from "../actions/ingredient-constructor";

const initialState = {
  bun: null,
  products: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BURGER_BUN:
      return { ...state, bun: action.payload };
    case ADD_BURGER_PRODUCT:
      return {
        ...state,
        products: [
          { ...action.payload, order: 0 },
          ...state.products.map((prod) => {
            return { ...prod, order: prod.order + 1 };
          }),
        ],
      };
    case REMOVE_BURGER_PRODUCT:
      return {
        ...state,
        products: state.products
          .filter((prod) => {
            return prod.order != action.payload.order;
          })
          .map((prod) => {
            return prod.order <= action.payload.order
              ? prod
              : { ...prod, order: prod.order - 1 };
          }),
      };
    default:
      return { ...state };
  }
};
