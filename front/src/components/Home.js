import React from "react";
import { List, Card } from "../design";

const Home = () => {
  const [products, setProducts] = React.useState(null);

  // At component mount, load products
  React.useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(response => {
        setProducts(response);
      });
  }, []);
  return !products ? (
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
  );
};

export default Home;
