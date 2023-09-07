chrome.runtime.sendMessage({ command: 'getDarkModeState' }, function (response) {
  toggleDarkMode(response.isDarkMode);
});

// Listen for darkModeChanged messages from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'darkModeChanged') {
    toggleDarkMode(request.isDarkMode);
  }
});

// Function that adds/removes the theme-dark class
function toggleDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.remove('theme-dark');
  }
}
