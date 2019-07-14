import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Markup } from "interweave";
import { Spinner, Slider } from "../design";

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 950px;
`;

const DetailsView = ({ product }) => {
  return !product ? (
    <Spinner />
  ) : (
    <Container>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <Slider images={product.images} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <p>{product.name}</p>
          <p>SKU: {product.partNumber}</p>
          <p>Normal: {product.prices.formattedListPrice}</p>
          <p>Internet: {product.prices.formattedOfferPrice}</p>
          <p>Descuento: {product.prices.discountPercentage}</p>
          {product.prices.ripleyPuntos && (
            <p>Acumulas: {product.prices.ripleyPuntos}</p>
          )}
        </div>
      </div>
      <details>
        <summary>Descripción</summary>
        <Markup
          content={product.longDescription.replace(/<head>.+<\/head>/g, "")}
        />
      </details>
      <details>
        <summary>Especificaciones</summary>
        {product.attributes
          .filter(({ displayable }) => displayable)
          .map(({ name, value }) => (
            <div
              key={name}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>{name}</div>
              <div>{value}</div>
            </div>
          ))}
      </details>
    </Container>
  );
};

DetailsView.propTypes = {
  product: PropTypes.object
};

export default DetailsView;
