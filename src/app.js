import express from 'express';
import request from 'request';
import cors from 'cors';
import { skus } from './sku';
import simple from './simple-api';
import { setKeys, setKey, allKey } from './redis-client';

const app = express();

app.use(cors());

// Get all products (from a SKU list)
app.get('/api/products', (_, res) => {
  // Take ["a", "b", ...] to "a,b,..."
  const partNumbers = skus.join(',');
  const uri = simple().byPartNumbers(partNumbers);
  // do request. (json: {} parse the response body automatically)
  return request.get(uri, { json: {} }, (error, r, body) => {
    if (error) {
      return res.send(500); // Internal server error
    }
    // Set redis cache before sending data.
    // First we store SKUs retrieved from API.
    const values = body.map(({ partNumber }) => partNumber);
    setKey(allKey, JSON.stringify(values));
    // Then we set every individual key, as the info is the same.
    setKeys(body);
    return res.send(body);
  });
});

// Get an specific product info
app.get('/api/products/:partNumber', (req, res) => {
  const {
    params: { partNumber },
  } = req;
  const uri = simple().byPartNumber(partNumber);
  return request.get(uri, { json: {} }, (error, r, body) => {
    if (error) {
      return res.send(500);
    }
    // Set redis cache before sending data.
    const value = JSON.stringify(body);
    setKey(body.partNumber, value);
    return res.send(body);
  });
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
