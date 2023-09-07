document.addEventListener('DOMContentLoaded', event => {
  const toggleSwitch = document.getElementById('toggle-switch');

  chrome.runtime.sendMessage({ command: 'getDarkModeState' }, function (response) {
    toggleSwitch.checked = response.isDarkMode;
  });

  toggleSwitch.addEventListener('change', event => {
    chrome.runtime.sendMessage({ command: 'toggleDarkMode' }, function (response) {
      toggleSwitch.checked = response.isDark;
    });
  });
});
