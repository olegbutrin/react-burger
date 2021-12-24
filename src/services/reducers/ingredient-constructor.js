import {
  SET_BURGER_BUN,
  ADD_BURGER_PRODUCT,
  REMOVE_BURGER_PRODUCT,
  SWAP_BURGER_PRODUCTS,
} from "../actions/ingredient-constructor";

const initialState = {
  bun: null,
  products: [],
  currentIndex: 0,
  isEmpty: true,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BURGER_BUN:
      return { ...state, bun: action.payload, isEmpty: false };
    case ADD_BURGER_PRODUCT:
      return {
        ...state,
        products: [
          { ...action.payload.item, id: action.payload.id },
          ...state.products,
        ],
        currentIndex: action.payload.id,
        isEmpty: false,
      };
    case REMOVE_BURGER_PRODUCT:
      return {
        ...state,
        products: state.products.filter((prod) => {
          return prod.id != action.payload.id;
        }),
      };
    case SWAP_BURGER_PRODUCTS:
      const nextState = {
        ...state,
        products: state.products.map((prod) => {
          if (prod.id === action.payload.dest.id)
            return { ...action.payload.source };
          else if (prod.id === action.payload.source.id)
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
