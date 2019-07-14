import React from "react";
import api from "./../config/apiRoutes";
import { DetailsView } from "../views";

const Details = ({ match }) => {
  React.useEffect(() => {
    const {
      params: { partNumber }
    } = match;
    fetch(api.products.byPartNumber(partNumber))
      .then(res => res.json())
      .then(res => console.log(res));
  });

  return <DetailsView />;
};

export default Details;
