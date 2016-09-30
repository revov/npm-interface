const {Menu, MenuItem} = require('electron')
const path = require('path');
const {dialog} = require('electron');

const { recentFoldersDb } = require('./database');

function loadProject(packagePath, focusedWindow) {
    recentFoldersDb.remove({path: packagePath}, () => {
        recentFoldersDb.insert({path: packagePath}, (err, docs) => {
            updateOpenRecentSubmenu();
        });
    });

    focusedWindow.webContents.send('load-project', packagePath);
}

function buildOpenRecentSubmenuItems() {
    return new Promise((resolve, reject) => {
        recentFoldersDb.find({}).sort({ createdAt: -1 }).limit(5).exec(function (err, docs) {
            if(err) {
                reject(err);
            } else {
                resolve(docs.map(doc => {
                    return new MenuItem({
                        label: doc.path,
                        click (item, focusedWindow) {
                            loadProject(doc.path, focusedWindow);
                        }
                    });
                }));
            }
        });
    });
}

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
            loadProject(directories[0], focusedWindow);
          }
        }
      },
      {
          label: 'Open Recent',
          submenu: []
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
          if (focusedWindow) focusedWindow.loadURL(`file://${path.resolve(__dirname, '..')}/renderer/index.html`);
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
const openRecentSubmenu = menu.items[0].submenu.items[1].submenu;
Menu.setApplicationMenu(menu);

function updateOpenRecentSubmenu() {
    buildOpenRecentSubmenuItems()
        .then(newOpenRecentSubmenuItems => {
            openRecentSubmenu.clear();
            newOpenRecentSubmenuItems.forEach(menuItem => {
                openRecentSubmenu.append(menuItem);
            });
        });
}

updateOpenRecentSubmenu();