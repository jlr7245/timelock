let storageStub = {
  config:
    '[{"url":"twitter.com","time":5},{"url":"facebook.com","time":5},{"url":"tumblr.com","time":5}]',
  'facebook.com': 0,
  'tumblr.com': 0,
  'twitter.com': 6,
};

export const getFromStorage = (keys, callback) => {
  if (Array.isArray(keys)) {
    const result = keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: storageStub[key],
      }),
      {}
    );
    callback(result);
  } else if (key) callback(storageStub[key]);
  else callback(storageStub);
};

export const setStorage = (values, callback) => {
  storageStub = {
    ...storageStub,
    ...values,
  };
  callback(true);
};
