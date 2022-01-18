import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const IngredientPreviewPage = () => {
  const history = useHistory();

  const { ingredients } = useSelector((store) => store.list);
  const { id } = useParams();
  const data = ingredients.find((item) => {
    return item._id === id;
  });

  useEffect(() =>{
    if (!data) {
      history.push("/");
    }
  }, [data, history]);

  return <div className="pt-20">
    <IngredientDetails productsData={data}/>
  </div>;
};

export default IngredientPreviewPage;
