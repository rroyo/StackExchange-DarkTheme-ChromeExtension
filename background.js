let isDarkMode = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'toggleDarkMode') {
    isDarkMode = !isDarkMode;
    // Notify all tabs of the change in isDarkMode
    chrome.tabs.query({}, function (tabs) {
      for (let i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, { command: 'darkModeChanged', isDarkMode: isDarkMode });
      }
    });
    sendResponse({ isDarkMode: isDarkMode });
  } else if (request.command === 'getDarkModeState') {
    sendResponse({ isDarkMode: isDarkMode });
  }
  return true;
});
