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
        {/* Little "hack" to refresh page if user clicks logo in dashboard */}
        <Route path="/r" component={null} />{" "}
      </Container>
    </Switch>
  );
}

export default App;
