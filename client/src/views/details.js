import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Markup } from "interweave";

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 950px;
`;

const DetailsView = ({ product }) => {
  return !product ? (
    <div>Cargando</div>
  ) : (
    <Container>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <img
            alt="product"
            style={{ width: "100%" }}
            src={`http:${product.fullImage}`}
          />
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
      <div>
        <h3>Descripción</h3>
        <Markup
          content={product.longDescription.replace(/<head>.+<\/head>/g, "")}
        />
      </div>
      <div>
        <h3>Especificaciones</h3>
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
      </div>
    </Container>
  );
};

DetailsView.propTypes = {
  product: PropTypes.object
};

export default DetailsView;
