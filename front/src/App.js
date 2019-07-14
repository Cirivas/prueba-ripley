import React from "react";
import { Card, List } from "./design";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
`;

function App() {
  const [products, setProducts] = React.useState(null);

  // At component mount, load products
  React.useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(response => {
        setProducts(response);
      });
  }, []);

  return (
    <Container>
      {!products ? (
        <div>Loading</div>
      ) : (
        <List>
          {(products || []).map(product => (
            <Card
              key={product.uniqueID}
              img={`https:${product.fullImage}`}
              title={product.name}
              body={product.prices.formattedListPrice}
              onClick={() =>
                fetch(`http://localhost:5000/api/product/${product.partNumber}`)
                  .then(res => res.json())
                  .then(res => console.log(res))
              }
            />
          ))}
        </List>
      )}
    </Container>
  );
}

export default App;
