import redis from 'redis';

const TTL = 60;

export const allKey = 'ALL';

// Use default redis://127.0.0.1/6379 or env variable
const client = redis.createClient(process.env.REDIS_URL || null);
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

// Get a key from REDIS
// returns a promise with value, or rejects if no value was found or if there was an error
export const getKey = key => new Promise((resolve, reject) => {
  client.get(key, (error, result) => {
    if (error || !result) {
      return reject();
    }
    return resolve(result);
  });
});

export default client;
