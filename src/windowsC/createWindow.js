const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow;


var button = document.getElementById("createW");

const path = require('path');


const createWindow = () => {
    // Create the browser window.
    const pru = new BrowserWindow({
        width: 800,
        height: 600,
        maxWidth: 800,
        maxHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },

    });

    // and load the index.html of the app.
    pru.loadFile(path.join(__dirname, 'index.html'));


};

button.addEventListener("click", function() {

    createWindow();

})