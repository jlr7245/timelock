let storageStub = {
  config: [
    { url: 'twitter.com', time: 50 },
    { url: 'facebook.com', time: 50 },
    { url: 'tumblr.com', time: 50 },
  ],
  'facebook.com': 0,
  'tumblr.com': 0,
  'twitter.com': 6,
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
    console.log(result);
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
