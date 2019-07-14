import React from "react";
import { List, Product } from "../design";
import api from "./../config/apiRoutes";

const Home = () => {
  const [products, setProducts] = React.useState(null);

  // At component mount, load products
  React.useEffect(() => {
    fetch(api.products.all())
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
        <Product
          key={product.uniqueID}
          img={`https:${product.fullImage}`}
          title={product.name}
          body={product.prices.formattedListPrice}
          onClick={() =>
            fetch(api.products.byPartNumber(product.partNumber))
              .then(res => res.json())
              .then(res => console.log(res))
          }
        />
      ))}
    </List>
  );
};

export default Home;
