import React from "react";
import api from "./../config/apiRoutes";
import { HomeView } from "../views";

const Home = () => {
  const [products, setProducts] = React.useState(null);

  const loadDetails = ({ partNumber }) => {
    fetch(api.products.byPartNumber(partNumber))
      .then(res => res.json())
      .then(res => console.log(res));
  };

  // At component mount, load products
  React.useEffect(() => {
    fetch(api.products.all())
      .then(res => res.json())
      .then(response => {
        setProducts(response);
      });
  }, []);

  return <HomeView products={products} onClick={loadDetails} />;
};

export default Home;
