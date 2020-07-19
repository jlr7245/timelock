export const getFromStorage = (keys, callback) => {
  chrome.storage.sync.get(keys, callback);
};

export const setStorage = (values, callback) => {
  chrome.storage.sync.set(values, () => callback(true));
};
