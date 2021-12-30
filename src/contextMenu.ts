const { remote } = require('electron');

const { Menu, MenuItem } = remote;

export function getCurrentWindow() {
  return remote.getCurrentWindow();
}

export { Menu, MenuItem };
