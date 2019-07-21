function TimeController(config, currents = {}) {
  this.urlLookup = config.map(({ url }) => url);
  this.config = config;

  this.state = config.reduce(
    (acc, { url, time }) =>
      Object.assign(acc, { [url]: { max: time, current: currents[url] || 0 } }),
    {}
  );

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
    this.state[blockedUrl].current++;
    this.updateCurrentFor(blockedUrl, this.state[blockedUrl].current);
    if (this.state[blockedUrl].current > this.state[blockedUrl].max) {
      this.closeTab(tabId);
    }
  }, 5000);
};

TimeController.prototype.closeTab = function(tabId) {
  try {
    chrome.tabs.remove(tabId);
  } catch (err) {
    console.log(err);
  }
};

TimeController.prototype.clearInterval = function() {
  clearInterval(this.currentInterval);
};

TimeController.prototype.clearCounters = function() {
  this.state = this.config.reduce(
    (acc, { url, time }) =>
      Object.assign(acc, { [url]: { max: time, current: 0 } }),
    {}
  );
  this.urlLookup.forEach(url => {
    this.updateCurrentFor(url, 0);
  });
};

TimeController.prototype.updateCurrentFor = function(url, value) {
  chrome.storage.sync.set({ [url]: value });
}
