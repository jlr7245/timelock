let storageStub = {
  config: [
    { url: 'twitter.com', time: 500 },
    { url: 'facebook.com', time: 500 },
    { url: 'tumblr.com', time: 500 },
  ],
  'facebook.com': 0,
  'tumblr.com': 0,
  'twitter.com': 250,
};

export const getFromStorage = (keys, cb) => {
  if (Array.isArray(keys)) {
    const result = keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: storageStub[key],
      }),
      {}
    );
    cb(result);
  } else if (typeof keys === 'string') cb({ [keys]: storageStub[keys] });
  else if (keys === null) cb(storageStub);
  else throw new Error('Invalid keys');
};

export const setStorage = (values, cb) => {
  storageStub = {
    ...storageStub,
    ...values,
  };
  cb(true);
};
