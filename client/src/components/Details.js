import React from "react";
import api from "./../config/apiRoutes";
import { DetailsView } from "../views";

const Details = ({ match }) => {
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const {
      params: { partNumber }
    } = match;
    fetch(api.products.byPartNumber(partNumber))
      .then(res => res.json())
      .then(response => setProduct(response));
  }, [match]);

  return <DetailsView product={product} />;
};

export default Details;
