let isDarkMode = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'toggleDarkMode') {
    isDarkMode = !isDarkMode;

    // Query only for StackExchange websites where the content script should be running
    const urlPatterns = [
      '*://*.mathoverflow.net/*',
      '*://*.stackapps.com/*',
      '*://*.askubuntu.com/*',
      '*://*.superuser.com/*',
      '*://*.stackoverflow.com/*',
      '*://*.stackexchange.com/*',
      '*://*.serverfault.com/*',
    ];

    chrome.tabs.query({ url: urlPatterns, status: 'complete' }, function (tabs) {
      for (let i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(
          tabs[i].id,
          { command: 'darkModeChanged', isDarkMode: isDarkMode },
          function (response) {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
            }
          }
        );
      }
    });

    sendResponse({ isDarkMode: isDarkMode });
  } else if (request.command === 'getDarkModeState') {
    sendResponse({ isDarkMode: isDarkMode });
  }
  return true;
});
