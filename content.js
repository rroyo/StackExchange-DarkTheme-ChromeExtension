function addDarkTheme() {
  const body = document.body;
  if (body) {
    body.classList.add('theme-dark');
  }
}

window.addEventListener('load', addDarkTheme);
