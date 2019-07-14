export default {
  products: {
    all: () => "/api/products",
    byPartNumber: partNumber => `/api/products/${partNumber}`
  }
};
