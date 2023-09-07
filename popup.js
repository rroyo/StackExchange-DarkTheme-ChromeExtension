document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggle-switch');

  chrome.runtime.sendMessage({ command: 'getDarkModeState' }, function (response) {
    // Setting .checked directly to sync initial state
    toggleSwitch.checked = response.isDarkMode;
  });

  toggleSwitch.addEventListener('change', () => {
    chrome.runtime.sendMessage({ command: 'toggleDarkMode' }, function (response) {
      // Using .click() to toggle checkbox and trigger CSS transition
      if (response.isDarkMode !== toggleSwitch.checked) {
        toggleSwitch.click();
      }
    });
  });
});
