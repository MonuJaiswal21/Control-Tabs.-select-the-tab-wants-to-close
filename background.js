// List all open tabs and send the list to the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getTabs') {
      chrome.tabs.query({}, (tabs) => {
        sendResponse(tabs);
      });
      // Return true to indicate you'll send a response asynchronously
      return true;
    } else if (message.action === 'closeTab') {
      chrome.tabs.remove(message.tabId);
    }
  });
  