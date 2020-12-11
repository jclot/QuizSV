const { create } = require('domain');
const { app, BrowserWindow, Tray, Menu, MenuItem } = require('electron');
const { platform } = require('os');
const path = require('path');

// require('update-electron-app')({
//   repo: 'https://github.com/jclot/QuizSV',
//   updateInterval: '1 hour',
// })

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const isMac = process.platform === 'darwin'

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startspeaking' },
                        { role: 'stopspeaking' }
                    ]
                }
            ] : [
                { type: 'separator' },
                { role: 'selectAll' }
            ])
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close' }
            ])
        ]
    },
]


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let splash;
let mainWindow;

function createWindow() {

    if (process.platform === "darwin") {

        // Create the browser window.
        mainWindow = new BrowserWindow({
            titleBarStyle: 'hidden',
            width: 1200,
            height: 900,
            maxWidth: 1200,
            maxHeight: 900,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
            fullscreen: false,
            backgroundColor: "#fff",
            show: false

        });

    } else if (process.platform === "win32") {

        mainWindow = new BrowserWindow({
            titleBarStyle: 'hidden',
            width: 1700,
            height: 1000,
            maxWidth: 1700,
            maxHeight: 1000,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
            fullscreen: false,
            backgroundColor: "#fff",
            show: false

        });

    }

    splash = new BrowserWindow({ width: 610, height: 410, maxWidth: 610, maxHeight: 410, frame: false, minHeight: 410, minWidth: 610 })
    splash.loadFile(path.join(__dirname, 'pages/Loader.html'))
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.setMenuBarVisibility(null);

    mainWindow.once('ready-to-show', async() => {

        splash.show();
        await sleep(2000);
        splash.destroy();
        await sleep(500);
        mainWindow.show();
        mainWindow.reload()

    })

};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

    createWindow()

});

app.setName('QuizSV')

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.