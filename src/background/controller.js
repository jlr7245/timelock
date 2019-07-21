function TimeController(urls) {
  this.urlList = urls;
  this.urls = urls.reduce(
    (acc, { url, time }) =>
      Object.assign(acc, { [url]: { max: time, current: 0 } }),
    {}
  );
  this.urlLookup = urls.map(({ url }) => url);
  this.currentInterval = null;
}

TimeController.prototype.createIntervalFor = function(url, tabId) {
  this.clearInterval();
  const blockedUrl = this.urlLookup.reduce(
    (acc, val) => (url.indexOf(val) < 0 ? acc : val),
    ''
  );
  if (!blockedUrl) return;
  this.currentInterval = setInterval(() => {
    this.urls[blockedUrl].current++;
    if (this.urls[blockedUrl].current > this.urls[blockedUrl].max) {
      this.closeTab(tabId);
    }
  }, 1000);
};

TimeController.prototype.closeTab = function(tabId) {
  try {
    chrome.tabs.remove(tabId);
  } catch(err) {
    console.log(err);
  }
};

TimeController.prototype.clearInterval = function(intervalId) {
  clearInterval(this.currentInterval);
};

TimeController.prototype.clearCounters = function() {
  this.urls = this.urlList.reduce(
    (acc, { url, time }) =>
      Object.assign(acc, { [url]: { max: time, current: 0 } }),
    {}
  );
}
