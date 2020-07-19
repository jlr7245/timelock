let storageStub = {
  config:
    '[{"url":"twitter.com","time":5},{"url":"facebook.com","time":5},{"url":"tumblr.com","time":5}]',
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
    console.log(result)
    cb(result);
  } else if (keys) cb(storageStub[keys]);
  else cb(storageStub);
};

export const setStorage = (values, cb) => {
  storageStub = {
    ...storageStub,
    ...values,
  };
  cb(true);
};
