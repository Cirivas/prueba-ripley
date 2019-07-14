import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { Home, Details, Searchbar } from "./components";

const Container = styled.div`
  height: 100vh;
`;

function App() {
  return (
    <Switch>
      <Container>
        <Searchbar />
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/product/:partNumber" component={Details} />
      </Container>
    </Switch>
  );
}

export default App;
