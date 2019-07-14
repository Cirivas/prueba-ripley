import React from "react";
import { withRouter } from "react-router-dom";

const Searchbar = ({ history }) => {
  const handleSearch = event => {
    if (event.key === "Enter") {
      const partNumber = event.target.value;
      history.push(`/product/${partNumber}`);
    }
  };

  return (
    <input
      type="text"
      placeholder="Buscar por SKU..."
      onKeyDown={handleSearch}
    />
  );
};

// As this component is not part of a route, we need withRouter HOC to get the history prop.
export default withRouter(Searchbar);
