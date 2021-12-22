import { SET_ITEM_DATA, CLEAR_ITEM_DATA } from "../actions/ingredient-preview";

const initialState = {
  productData: null,
};

export const ingrPreviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM_DATA:
      return { ...state, productData: action.payload };
    case CLEAR_ITEM_DATA:
      return { ...initialState };
    default:
      return state;
  }
};
