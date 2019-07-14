import { allKey, getKey } from '../services/redis-client';

// Reads data from REDIS
// if type is allKey, returns it key
// otherwise, read partNumber in requested URI
const cacheReader = type => (req, res, next) => {
  if (type === allKey) {
    // We need to see if allkey exits in redis
    return getKey(allKey)
      .then((result) => {
        // if we got a result, send inmediately to user.
        const parsed = JSON.parse(result);
        res.send(parsed);
      })
      .catch(() => {
        // in case of error retreiven key or missing content, we go to the method
        next();
      });
  }

  // If type is different than allKey, we search in params
  const {
    params: { partNumber },
  } = req;

  // if no partNumber found in url, go to next method.
  if (!partNumber) {
    next();
    return null;
  }

  return getKey(partNumber)
    .then((result) => {
      // if we got a result, send inmediately to user.
      const parsed = JSON.parse(result);
      res.send(parsed);
    })
    .catch(() => {
      // in case of error retreiven key or missing content, we go to the method
      next();
    });
};

export default cacheReader;
