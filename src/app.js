import express from 'express';
import cors from 'cors';
import { skus } from './sku';
import simple from './simple-api';
import { setKeys, setKey, allKey } from './services/redis-client';
import requestRetrier from './services/request-retry';
import cacheReader from './middleware/cacheReader';

const app = express();

app.use(cors());

// Get all products (from a SKU list)
app.get('/api/products', cacheReader(allKey), (_, res) => {
  // Take ["a", "b", ...] to "a,b,..."
  const partNumbers = skus.join(',');
  const uri = simple().byPartNumbers(partNumbers);
  // do request. (json: {} parse the response body automatically)
  const request = { uri, method: 'GET', json: {} };
  return requestRetrier(request).then((body) => {
    // Set redis cache before sending data.
    // First we store SKUs retrieved from API.
    setKey(allKey, JSON.stringify(body));
    // Then we set every individual key, as the info is the same.
    setKeys(body);
    return res.send(body);
  });
});

// Get an specific product info
app.get('/api/products/:partNumber', cacheReader(), (req, res) => {
  const {
    params: { partNumber },
  } = req;
  const uri = simple().byPartNumber(partNumber);
  const request = { uri, method: 'GET', json: {} };
  return requestRetrier(request).then((body) => {
    // Set redis cache before sending data.
    const value = JSON.stringify(body);
    setKey(body.partNumber, value);
    return res.send(body);
  });
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
