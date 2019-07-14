import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";

const Container = styled.div`
  height: 100vh;
`;

function App() {
  return (
    <Switch>
      <Container>
        <Route exact path="/" component={Home} />
        <Route path="*" component={Home} />
      </Container>
    </Switch>
  );
}

export default App;
