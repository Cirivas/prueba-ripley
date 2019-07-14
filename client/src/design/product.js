import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  margin: 10px 4px;
  padding: 0;
  color: #000;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
  height: 350px;
  width: 280px;
  position: relative;
  :hover {
    border-color: rgba(0, 0, 0, 0.09);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
`;

const Header = styled.div`
  img {
    width: 100%;
    display: block;
  }

  h2 {
    margin-left: 5px;
    opacity: 0.6;
    font-size: 13px;
  }
`;

const Body = styled.div`
  padding: 5px;
`;

const Discount = styled.div`
  position: absolute;
  right: 0;
  color: white;
  background-color: #e75353;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 5px;
  font-weight: 600;
`;

const Product = ({ img, title, body, discount, onClick }) => {
  return (
    <Container onClick={onClick}>
      {discount && <Discount>-{discount}%</Discount>}
      <Header>
        <img alt="cover" src={img} />
        <h2>{title}</h2>
      </Header>
      <Body>{body}</Body>
    </Container>
  );
};

Product.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  discount: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

export default Product;
