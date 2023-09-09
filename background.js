

let isDarkMode = false;

// Initialize the dark mode state from storage on script startup
chrome.storage.local.get('isDarkMode', (data) => {
    if (data.hasOwnProperty('isDarkMode')) {
        isDarkMode = data.isDarkMode;
    }
});

chrome.storage.local.get('isDarkMode', (data) => {
    if (data.hasOwnProperty('isDarkMode')) {
        isDarkMode = data.isDarkMode;
    }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'toggleDarkMode') {
    
isDarkMode = !isDarkMode;
chrome.storage.local.set({ 'isDarkMode': isDarkMode });


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
  } 
else if (request.command === 'getDarkModeState') {
    chrome.storage.local.get('isDarkMode', (data) => {
        if (data.hasOwnProperty('isDarkMode')) {
            sendResponse({ isDarkMode: data.isDarkMode });
        } else {
            sendResponse({ isDarkMode: false });
        }
    });
    return true;  // Indicate that response will be sent asynchronously
}
  return true;
});
