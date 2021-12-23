import {
  SET_BURGER_BUN,
  ADD_BURGER_PRODUCT,
  REMOVE_BURGER_PRODUCT,
  SWAP_BURGER_PRODUCTS,
} from "../actions/ingredient-constructor";

const initialState = {
  bun: null,
  products: [],
};

const getIndex = (() => {
  let index = 0;
  return () => {
    return ++index;
  };
})();

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BURGER_BUN:
      return { ...state, bun: action.payload };
    case ADD_BURGER_PRODUCT:
      return {
        ...state,
        products: [{ ...action.payload, index: getIndex() }, ...state.products],
      };
    case REMOVE_BURGER_PRODUCT:
      return {
        ...state,
        products: state.products.filter((prod) => {
          return prod.index != action.payload.index;
        }),
      };
    case SWAP_BURGER_PRODUCTS:
      const nextState = {
        ...state,
        products: state.products.map((prod) => {
          if (prod.index === action.payload.dest.index)
            return { ...action.payload.source };
          else if (prod.index === action.payload.source.index)
            return { ...action.payload.dest };
          else {
            return prod;
          }
        }),
      };
      return nextState;
    default:
      return { ...state };
  }
};
