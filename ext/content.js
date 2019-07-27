console.log('Timelock is here!');

chrome.runtime.onMessage.addListener((req, send, res) => {
  console.log(req);
});
