const {Menu} = require('electron')
const path = require('path');
const {dialog} = require('electron');

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
        click (item, focusedWindow) {
          const directories = dialog.showOpenDialog(
            focusedWindow,
            {
              title: 'Open a folder, containing package.json',
              properties: ['openDirectory']
            }
          );

          if(directories && directories[0]) {
            focusedWindow.webContents.send('load-project', directories[0]);
          }
        }
      },
      {
        role: 'quit'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      // Overriding the standard reload since it doesn't work well with Angular Router without a web server'
      {
        label: 'Reload',
        accelerator: process.platform === 'darwin' ? 'Command+R' : 'Ctrl+R',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.loadURL(`file://${path.resolve(__dirname, '..')}/browser/index.html`);
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

