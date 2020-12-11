const { desktopCapturer, remote } = require('electron');
const { platform } = require('os');
const dragable = document.getElementById('dragable');

const backButton = document.getElementById('backInstructionsButton');
backButton.onclick = () => {

    remote.getCurrentWindow().close();
    remote.getCurrentWindow().setFocusable(true);
}

if (process.platform === "win32") {

    dragable.remove();

}