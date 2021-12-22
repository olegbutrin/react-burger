import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import { IIngredientData } from "../../../../utils/types";

const DraggableContainer = ({ element, onClick }) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: element,
  });
  return (
    <div className="draggable" ref={dragRef} onClick={props.onClick}>
      {element}
    </div>
  );
};

DraggableContainer.propTypes = {
  element: II.isRequired,
  onClick: PropTypes.func,
};
