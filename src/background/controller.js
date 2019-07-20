function Controller(urls) {
  this.urls = urls.reduce(
    (acc, { url, time }) =>
      Object.assign(acc, { [url]: { max: time, current: 0 } }),
    {}
  );
  this.urlLookup = urls.map(({ url }) => url);
  this.intervals = {};
}

Controller.prototype.createIntervalFor = function(url, tabId) {
  console.warn(tabId);
  const blockedUrl = this.urlLookup.reduce(
    (acc, val) => (url.indexOf(val) < 0 ? acc : val),
    ''
  );
  if (!blockedUrl) return;
  const intervalId = `${blockedUrl}-${tabId}`;
  this.intervals[intervalId] = setInterval(() => {
    console.warn('interval running', tabId);
    this.urls[blockedUrl].current++;
    if (this.urls[blockedUrl].current > this.urls[blockedUrl].max) {
      this.closeTab(tabId);
      this.clearInterval(intervalId);
    }
  }, 100);
};

Controller.prototype.closeTab = function(tabId) {
  chrome.tabs.remove(tabId);
};

Controller.prototype.clearInterval = function(intervalId) {
  clearInterval(this.intervals[intervalId]);
};
