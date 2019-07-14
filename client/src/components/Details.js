import React from "react";
import api from "./../config/apiRoutes";
import { DetailsView, NotFound } from "../views";

const Details = ({ match, history }) => {
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const {
      params: { partNumber }
    } = match;
    fetch(api.products.byPartNumber(partNumber))
      .then(res => res.json())
      .then(response => setProduct(response));
  }, [match]);

  return product && product.error ? (
    <NotFound onClick={() => history.push("/")} />
  ) : (
    <DetailsView product={product} />
  );
};

export default Details;
