import PropTypes from "prop-types";

export const PTIngrListType = PropTypes.oneOf(["bun", "sauce", "main"]);

export const PTIngrList = PropTypes.shape({
  value: PropTypes.string.isRequired,
  type: PTIngrListType,
  max: PropTypes.number.isRequired,
  unique: PropTypes.bool.isRequired,
  initial: PropTypes.bool.isRequired,
});

export const PTIngredientSelected = PropTypes.shape({
  bun: PropTypes.arrayOf(PropTypes.string).isRequired,
  sauce: PropTypes.arrayOf(PropTypes.string).isRequired,
  main: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const PTIngredientTypes = PropTypes.arrayOf(PTIngrList);

export const PTIngredientData = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PTIngrListType,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const PTapiData = PropTypes.shape({
  success: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PTIngredientData),
});

export const PTMenuItem = PropTypes.shape({
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
});

export const PTRef = PropTypes.any;