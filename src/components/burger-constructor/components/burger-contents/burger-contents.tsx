import PropTypes from "prop-types";

import { IContentsOrderItem, IIngredientData } from "../../../../utils/types";

import { PTIngredientData, PTContentsOrderItem } from "../../../../utils/props";

import BurgerContentsItem from "../burger-contents-item/burger-contents-item";

import css from "./burger-contents.module.css";

const BurgerContents = (props: {
  productsData: IIngredientData[];
  productsOrder: IContentsOrderItem[];
  removeCallback: (...args: any[]) => void;
  changeOrderCallback: (...args: any[]) => void;
}) => {
  return (
    <div className={css.container + " custom-scroll"}>
      {props.productsOrder.map(
        (orderItem: IContentsOrderItem, index: number) => {
          const dataItem = props.productsData.find((item: IIngredientData) => {
            return item._id === orderItem.id;
          });
          if (dataItem) {
            return (
              <BurgerContentsItem
                key={["BurgerItem", index].join("_")}
                data={dataItem}
                type={orderItem.type}
                index={orderItem.index}
                removeCallback={props.removeCallback}
              />
            );
          } else {
            return "";
          }
        }
      )}
    </div>
  );
};

BurgerContents.propTypes = {
  productsData: PropTypes.arrayOf(PTIngredientData).isRequired,
  productsOrder: PropTypes.arrayOf(PTContentsOrderItem).isRequired,
  removeCallback: PropTypes.any,
  changeOrderCallback: PropTypes.any,
};

export default BurgerContents;
