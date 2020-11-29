const { desktopCapturer, remote } = require('electron');

const backButton = document.getElementById('backInstructionsButton');
backButton.onclick = () => {
  
  remote.getCurrentWindow().close();
  remote.getCurrentWindow().setFocusable(true);
}