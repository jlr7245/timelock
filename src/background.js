chrome.runtime.onInstalled.addListener(() => {
  console.log('hello world');
});

const timeouts = {};

chrome.webNavigation.onDOMContentLoaded.addListener(window => {
  console.log(window.url);
});
