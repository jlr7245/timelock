export const getFromStorage = (keys, callback) => {
  chrome.storage.sync.get(keys, callback);
};

export const setStorage = (values, callback) => {
  chrome.storage.sync.set(values, () => callback(true));
};

export const getHMFrom5S = (seconds) => {
  // bc of the way that the chrome storage API works we gotta
  // store our seconds in five second chunks... we cannot update
  // every second
  const actualSeconds = seconds * 5;
  const hoursMinutesSeconds = new Date(actualSeconds * 1000)
    .toISOString()
    .substr(11, 8);
  return hoursMinutesSeconds.split(':');
};

export const get5SFromHM = (hours, minutes) =>
  Math.round((hours * 3600 + minutes * 60) / 5);
