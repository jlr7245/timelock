chrome.runtime.onInstalled.addListener(() => {
  console.log('hello world');
  // serve a page that allows user to add urls
});

// delete this later
const tempUrls = [
  { url: 'twitter.com', time: 3600 },
  { url: 'facebook.com', time: 3600 },
  { url: 'tumblr.com', time: 3600 }
];

// this should take in something that's set up by the user
const timelock = new TimeController(tempUrls);

/* ===== INTERVAL HANDLERS ===== */
// when visiting a page from an existing tab
chrome.webNavigation.onCompleted.addListener(window => {
  if (window.frameId === 0) {
    timelock.createIntervalFor(window.url, window.tabId);
  }
});

// when switching tabs
chrome.tabs.onActivated.addListener(activeWindow => {
  const { tabId } = activeWindow;
  chrome.tabs.get(tabId, tab => {
    timelock.createIntervalFor(tab.url, tabId);
  });
});

/* ===== ALARMS ===== */
chrome.alarms.create('cron::clear', {
  when: fourAMFromNow(),
  periodInMinutes: 1440,
});

chrome.alarms.onAlarm.addListener(alarm => {
  timelock.clearCounters();
});
