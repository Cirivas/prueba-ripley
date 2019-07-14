import express from 'express';
import request from 'request';
import cors from 'cors';
import { skus } from './sku';
import simple from './simple-api';

const app = express();

app.use(cors());

// Get all products (from a SKU list)
app.get('/products', (_, res) => {
  // Take ["a", "b", ...] to "a,b,..."
  const partNumbers = skus.join(',');
  const uri = simple().byPartNumbers(partNumbers);
  // do request. (json: {} parse the response body automatically)
  return request.get(uri, { json: {} }, (error, r, body) => {
    if (error) {
      return res.send(500); // Internal server error
    }
    return res.send(body);
  });
});

app.get('/product/:partNumber', (req, res) => {
  const {
    params: { partNumber },
  } = req;
  const uri = simple().byPartNumber(partNumber);
  return request.get(uri, { json: {} }, (error, r, body) => {
    if (error) {
      return res.send(500);
    }
    return res.send(body);
  });
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
