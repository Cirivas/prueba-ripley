import React from "react";
import { Card, List } from "./design";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <List>
        <Card
          img={
            "https://ripleycl.imgix.net/http%3A%2F%2Fs3.amazonaws.com%2Fimagenes-sellers-mercado-ripley%2F2019%2F05%2F23173521%2FiPhone-6s-Rose-Gold.jpg?w=270&h=220&bg=FFFFFF&ch=Width%2CSave-Data&auto=format%2Ccompress&trimcolor=FFFFFF&trim=color&fit=fillmax&ixlib=js-1.1.0&s=edf28d78e334585717b003acac2a6523"
          }
          title={"producto"}
          body={"precio"}
          onClick={() => console.log("card clicked")}
        />
      </List>
    </Container>
  );
}

export default App;
