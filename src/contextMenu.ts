const { remote } = require('electron');

const { Menu, MenuItem } = remote;

function getCurrentWindow() {
  return remote.getCurrentWindow();
}

export { Menu, MenuItem, getCurrentWindow };
