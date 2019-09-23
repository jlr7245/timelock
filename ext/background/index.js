let timelock = null;

chrome.runtime.onInstalled.addListener(installInfo => {
  console.log('hello world');
  console.log(installInfo);
  chrome.runtime.openOptionsPage();
});

// delete this later
const tempUrls = [
  { url: 'twitter.com', time: 5 },
  { url: 'facebook.com', time: 5 },
  { url: 'tumblr.com', time: 5 },
];
chrome.storage.sync.set({ config: JSON.stringify(tempUrls) }, () => {
  console.log('storage set with tempUrls');
});
// end delete this later

/* ===== STORAGE HANDLERS ===== */
const parseURLsAndCreateTimelock = config => {
  const urls = config.reduce((acc, { url }) => ({ ...acc, [url]: 0 }), {});
  chrome.storage.sync.get(urls, currents => {
    timelock = new TimeController(config, currents);
    initHandlers(timelock);
  });
};

// if the new timelock is created by a change in the settings
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.config) {
    parseURLsAndCreateTimelock(JSON.parse(changes.config.newValue));
  }
});

// normal initialization on browser open
if (!timelock) {
  chrome.storage.sync.get('config', result => {
    if (result.config) {
      const config = JSON.parse(result.config);
      parseURLsAndCreateTimelock(config);
    } else {
      console.log('dont forget to set up your timelock!');
    }
  });
}

/**
 * initializes chrome event handlers that require timelock instance
 * to exist before initialization
 *
 * @param {TimeController} timelock
 */
function initHandlers(timelock) {
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

  // when switching windows
  chrome.windows.onFocusChanged.addListener(window => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      ([tab, ...rest]) => {
        if (tab) {
          timelock.createIntervalFor(tab.url, tab.id);
        } else {
          timelock.clearInterval();
        }
      }
    );
  });

  /* ===== ALARMS ===== */
  chrome.alarms.create('cron::clear', {
    when: fourAMFromNow(),
    // periodInMinutes: 1440, /* real code */
    periodInMinutes: 2 /* dev code */,
  });

  chrome.alarms.onAlarm.addListener(alarm => {
    timelock.clearCounters();
  });
}
