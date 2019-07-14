import React from "react";
import PropTypes from "prop-types";
import { List, Product } from "./../design";
import Spinner from "../design/spinner";

const HomeView = ({ products, onClick }) => {
  return !products ? (
    <Spinner />
  ) : (
    <List>
      {(products || []).map(product => (
        <Product
          key={product.uniqueID}
          img={`https:${product.fullImage}`}
          title={product.name}
          prices={product.prices}
          discount={product.prices.discountPercentage || null}
          onClick={() => onClick(product)}
        />
      ))}
    </List>
  );
};

HomeView.propTypes = {
  products: PropTypes.array,
  onClick: PropTypes.func.isRequired
};

export default HomeView;
