const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;



var button = document.getElementById("createW");

const path = require('path');

let InstructionsScreen;
let splash;

const createWindowInstructions = () => {
    // Create the browser window.
     InstructionsScreen = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: 800,
        height: 600,
        maxWidth: 800,
        maxHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        fullscreen: false,
        backgroundColor: "#fff",
      


    });


    InstructionsScreen.loadFile(path.join(__dirname, 'pages/Instructions.html'));

};

button.addEventListener("click", function() {

    createWindowInstructions();

})




