import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const List = ({ children }) => {
  return <ListContainer>{children}</ListContainer>;
};

export default List;
