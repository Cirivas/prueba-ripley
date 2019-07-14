import redis from 'redis';

const TTL = 60;

export const allKey = 'ALL';

// Use default redis://127.0.0.1/6379
const client = redis.createClient();
client.on('connect', () => {
  console.log('connected to redis client');
});

// Store a single key in redis.
// Keys will be the product partNumber
export const setKey = (key, value) => {
  // Set the key and an expiring time for key
  client.set(key, value, () => {
    client.expire(key, TTL);
  });
};

// Store multiple keys based on array.
// values element must contain partNumber property.
export const setKeys = (values = []) => {
  values.forEach((value) => {
    const parsed = JSON.stringify(value);
    setKey(value.partNumber, parsed);
  });
};

export default client;
