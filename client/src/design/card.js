import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  margin: 10px;
  padding: 0;
  color: #000;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
  height: 350px;
  width: 250px;
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
    margin-left: 20px;
  }
`;

const Body = styled.div`
  padding: 20px;
`;

const Card = ({ img, title, body, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Header>
        <img alt="cover" src={img} />
        <h2>{title}</h2>
      </Header>
      <Body>{body}</Body>
    </Container>
  );
};

Card.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Card;
