chrome.runtime.onInstalled.addListener(() => {
  console.log('hello world');
});

const tempUrls = [
  { url: 'twitter.com', time: 60 },
  { url: 'facebook.com', time: 60 }
]

const timelock = new Controller(tempUrls);

chrome.webNavigation.onCompleted.addListener(window => {
  if (window.frameId === 0) {
    timelock.createIntervalFor(window.url, window.tabId);
  }
});

chrome.tabs.onActivated.addListener(activeWindow => {
  console.log(activeWindow);
  const { tabId } = activeWindow;
  chrome.tabs.get(tabId, tab => {
    console.log(tab);
    timelock.createIntervalFor(tab.url, tabId);
  });
});
