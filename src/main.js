import { app, BrowserWindow, Menu } from 'electron';

let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        minHeight: 560,
        minWidth: 510,
        height: 560,
        width: 510
    });

    const name = app.getName();
    const template = [{
        label: name,
        submenu: [ // {
            //     label: `About ${name}`,
            //     click: () => {}
            // }, {
            //     type: 'separator'
            // },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                role: 'quit'
            }
        ]
    }];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
