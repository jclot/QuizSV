const { Menu } = require('electron');
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const { platform } = require('os');



const button = document.getElementById("createW");

const path_file = require('path');

let InstructionsScreen;

const createWindowInstructions = () => {

    if (process.platform === "darwin") {

        // Create the browser window.
        InstructionsScreen = new BrowserWindow({
            titleBarStyle: 'hidden',
            width: 800,
            height: 700,
            maxWidth: 800,
            maxHeight: 700,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
            fullscreen: false,
            backgroundColor: "#fff",
        });

    } else if (process.platform === "win32") {

        InstructionsScreen = new BrowserWindow({
            titleBarStyle: 'hidden',
            width: 670,
            height: 760,
            maxWidth: 670,
            maxHeight: 760,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
            fullscreen: false,
            backgroundColor: "#fff",
        });

    }
    InstructionsScreen.loadFile(path_file.join(__dirname, 'pages/Instructions.html'));

};


button.addEventListener("click", function() {

    createWindowInstructions();

})