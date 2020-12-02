"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('electron'),
    desktopCapturer = _require.desktopCapturer,
    remote = _require.remote;

var _require2 = require('fs'),
    writeFile = _require2.writeFile;

var dialog = remote.dialog,
    Menu = remote.Menu;

var _require3 = require('child_process'),
    spawn = _require3.spawn;

var minimize = function minimize() {
  remote.getCurrentWindow().minimize();
}; // Global state


var mediaRecorder; // MediaRecorder instance to capture footage

var recordedChunks = [];
var currentWindow = remote.getCurrentWindow();
var python = spawn('python', ['../py/AppRunning.py']);
var extensionSelectBtn = document.getElementById('extensionFile');
extensionSelectBtn.onclick = getExtensionSources; // Buttons

var videoElement = document.getElementById('screen');
var path;
var extensionFile = ["mp4", "avi", "mov", "webm", "none"];

function pyFile() {
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    console.log(data);
  });
  python.on('close', function (code) {
    console.log("child process close all stdio with code ".concat(code));
  });
}

var startBtn = document.getElementById('startBtn');

startBtn.onclick = function () {
  mediaRecorder.start();
  startBtn.classList.add('is-danger');
  startBtn.innerText = 'Recording...';
  minimize();
};

var stopBtn = document.getElementById('stopBtn');

stopBtn.onclick = function (e) {
  mediaRecorder.stop();
  startBtn.classList.remove('is-danger');
  startBtn.innerText = 'Start';
}; // const minimizeBtn = document.getElementById('minimizeBtn')
// minimizeBtn.onclick = e => {
//   minimize();
// }


var videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources; // Get the available video sources

function getVideoSources() {
  var inputSources, videoOptionsMenu;
  return regeneratorRuntime.async(function getVideoSources$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(desktopCapturer.getSources({
            types: ['window', 'screen']
          }));

        case 2:
          inputSources = _context.sent;
          videoOptionsMenu = Menu.buildFromTemplate(inputSources.map(function (source) {
            return {
              label: source.name,
              click: function click() {
                return selectSource(source);
              }
            };
          }));
          videoOptionsMenu.popup();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

var screenSetting = Object.assign({
  frameRate: 100,
  width: screen.availWidth,
  height: screen.availHeight
}); // Change the videoSource window to record

function selectSource(source) {
  var constraintsVideo, constraintsAudio, streamScreen, streamAudio, stream, options;
  return regeneratorRuntime.async(function selectSource$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          videoSelectBtn.innerText = source.name;
          constraintsVideo = {
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id,
                maxFrameRate: screenSetting.frameRate,
                maxHeight: screenSetting.height,
                maxWidth: screenSetting.width
              }
            }
          };
          constraintsAudio = {
            audio: true
          }; // Create a Stream

          _context2.next = 5;
          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia(constraintsVideo));

        case 5:
          streamScreen = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia(constraintsAudio));

        case 8:
          streamAudio = _context2.sent;
          stream = new MediaStream([].concat(_toConsumableArray(streamScreen.getVideoTracks()), _toConsumableArray(streamAudio.getAudioTracks()))); // Preview the source in a video element

          videoElement.srcObject = stream;
          videoElement.muted = true;
          videoElement.play();
          document.getElementById('stopVideoSelectBtn').addEventListener('click', function () {
            pyFile();
            stream.getTracks()[0].stop();
            currentWindow.reload();
          }); // Create the Media Recorder

          options = {
            mimeType: 'video/webm; codecs=vp9'
          };
          mediaRecorder = new MediaRecorder(stream, options); // Register Event Handlers

          mediaRecorder.ondataavailable = handleDataAvailable;
          mediaRecorder.onstop = handleStop; // Updates the UI

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
} // Captures all recorded chunks


function handleDataAvailable(e) {
  console.log('video data available');
  recordedChunks.push(e.data);
}

function selectExtension(values) {
  extensionSelectBtn.innerText = values;

  if (values === 'none') {
    return path = "untilted";
  } else {
    return path = "vid-".concat(Date.now(), ".").concat(values);
  }
}

function getExtensionSources() {
  var videoExtensionMenu = Menu.buildFromTemplate(extensionFile.map(function (values) {
    return {
      label: values,
      click: function click() {
        return selectExtension(values);
      }
    };
  }));
  videoExtensionMenu.popup();
} // Saves the video file on stop


function handleStop() {
  var blob, buffer, _ref, filePath;

  return regeneratorRuntime.async(function handleStop$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          blob = new Blob(recordedChunks, {
            type: 'video/webm; codecs=vp9'
          });
          _context3.t0 = Buffer;
          _context3.next = 4;
          return regeneratorRuntime.awrap(blob.arrayBuffer());

        case 4:
          _context3.t1 = _context3.sent;
          buffer = _context3.t0.from.call(_context3.t0, _context3.t1);
          _context3.next = 8;
          return regeneratorRuntime.awrap(dialog.showSaveDialog({
            buttonLabel: 'Save video',
            defaultPath: path
          }));

        case 8:
          _ref = _context3.sent;
          filePath = _ref.filePath;

          if (filePath) {
            writeFile(filePath, buffer, function () {
              return console.log('video saved successfully!');
            });
          }

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
} // `vid-${Date.now()}.webm`