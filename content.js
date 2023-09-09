chrome.runtime.sendMessage({ command: 'getDarkModeState' }, function (response) {
  toggleDarkMode(response.isDarkMode);
});

// Listen for darkModeChanged messages from background.js
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.command === 'darkModeChanged') {
    toggleDarkMode(request.isDarkMode);
    sendResponse({});
  } else if (request.command === 'ping') {
    sendResponse({ pong: true });
  }
});

function toggleDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.remove('theme-dark');
  }
}
