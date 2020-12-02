"use strict";

var _require = require('electron'),
    desktopCapturer = _require.desktopCapturer,
    remote = _require.remote;

var backButton = document.getElementById('backInstructionsButton');

backButton.onclick = function () {
  remote.getCurrentWindow().close();
  remote.getCurrentWindow().setFocusable(true);
};