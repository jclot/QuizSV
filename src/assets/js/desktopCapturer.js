const { desktopCapturer, remote } = require('electron');
const { writeFile, existsSync} = require('fs');
const { dialog, Menu } = remote;
const fis = require("fs");

// Global state
let mediaRecorder; // MediaRecorder instance to capture footage
const recordedChunks = [];
const currentWindow = remote.getCurrentWindow();

const extensionSelectBtn = document.getElementById('extensionFile')
extensionSelectBtn.onclick = getExtensionSources;

// Buttons
const videoElement = document.getElementById('screen');
let path;
let check_extension = false;
let check_screen_choosed = false;

const extensionFile = [

  "mp4",
  "avi",
  "mov",
  "webm",
  "none"

];

const path_find = [

  '~/Applications/Google Chrome.app',
  '~/Downloads/Google Chrome.app',
  '~/Desktop/Google Chrome.app'
];

const options_alert_choose_extension = {
	    type: 'question',
	    buttons: ['Ok'],
	    defaultId: 0,
	    title: 'Choose an extension',
	    message: 'Please choose another extension or you will have to do it manually.',
	    detail: 'If you chose "none" you will save the video without any extension or name, so you will have to do it manually.',
	  };

const options_alert_choose_extension_obligatory = {

	    type: 'question',
	    buttons: ['Ok, am going to choose a extension '],
	    defaultId: 0,
	    title: 'Choose an extension',
	    message: 'Please choose one extension',
	    detail: 'Choose a video extension to save it, otherwise you will have to set it manually when saving it.',
}

const options_alert_choose_screen_obligatory_perm = {

	    type: 'question',
	    buttons: ['Ok, am going to choose a screen '],
	    defaultId: 0,
	    title: 'Choose an screen',
	    message: 'Please choose one of your screens to start presenting',
	    detail: 'Choose the screen or window you want to record.',

}

const startBtn = document.getElementById('startBtn');

startBtn.onclick = () => {

if(check_screen_choosed === false) {

	dialog.showMessageBox(null, options_alert_choose_screen_obligatory_perm, (response, checkboxChecked) => {
	console.log(response);
    	console.log(checkboxChecked);
    });
   }
   else if(check_extension && check_screen_choosed === true) {

  	mediaRecorder.start();
  	startBtn.classList.add('is-danger');
  	startBtn.innerText = 'Recording...';
  	remote.getCurrentWindow().minimize();
   } else {

	dialog.showMessageBox(null, options_alert_choose_extension_obligatory, (response, checkboxChecked) => {
	console.log(response);
    	console.log(checkboxChecked);
    });
   }
  };

const stopBtn = document.getElementById('stopBtn');

stopBtn.onclick = e => {

  mediaRecorder.stop();
  startBtn.classList.remove('is-danger');
  startBtn.innerText = 'Start';
};


const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;

// Get the available video sources
async function getVideoSources() {
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });

  const videoOptionsMenu = Menu.buildFromTemplate(
    inputSources.map(source => {
      return {
        label: source.name,
        click: () => { selectSource(source), check_screen_choosed = true },

      };
    })
  );


  videoOptionsMenu.popup();
}

const screenSetting = Object.assign({

  frameRate: 100,
  width: screen.availWidth,
  height: screen.availHeight,

})

// Change the videoSource window to record
async function selectSource(source) {

  videoSelectBtn.innerText = source.name;

  const constraintsVideo = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
        maxFrameRate: screenSetting.frameRate,
        maxHeight: screenSetting.height,
        maxWidth: screenSetting.width,
      }
    }
  };

  const constraintsAudio = {

    audio: true

  }

  // Create a Stream
  const streamScreen = await navigator.mediaDevices.getUserMedia(constraintsVideo);
  const streamAudio = await navigator.mediaDevices.getUserMedia(constraintsAudio);

  const stream = new MediaStream([...streamScreen.getVideoTracks(), ...streamAudio.getAudioTracks()])

  // Preview the source in a video element
  videoElement.srcObject = stream;
  videoElement.muted = true;
  videoElement.play();

  document.getElementById('stopVideoSelectBtn').addEventListener('click', () => {
    stream.getTracks()[0].stop()
    currentWindow.reload()
  })

  // Create the Media Recorder
  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new MediaRecorder(stream, options);

  // Register Event Handlers
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;

  // Updates the UI
}
// Captures all recorded chunks
function handleDataAvailable(e) {
  console.log('video data available');
  recordedChunks.push(e.data);
}

// select an extension for the video file

function selectExtension(values) {

  extensionSelectBtn.innerText = values

  if(values === 'none') {

   return (

	   path = `untilted`,

	   dialog.showMessageBox(null, options_alert_choose_extension, (response, checkboxChecked) => {
	console.log(response);
    	console.log(checkboxChecked);
    })

    )

  } else if( values === 'none' && fis.existsSync(path_find[0]) || fis.existsSync(path_find[1]) || fis.existsSync(path_find[2])) {

      return path = `vid-${Date.now()}.webm`;

  } else {

    return path = `vid-${Date.now()}.${values}`;

  }

}

// Get the current aviable extensiones values
function getExtensionSources() {

    const videoExtensionMenu = Menu.buildFromTemplate(

    extensionFile.map(values => {
    return {
      label: values,
      click: () => { selectExtension(values), check_extension = true }
    };
  })
)

videoExtensionMenu.popup();

}

// Saves the video file on stop
async function handleStop() {
  const blob = new Blob(recordedChunks, {
    type: 'video/webm; codecs=vp9'
  });

  const buffer = Buffer.from(await blob.arrayBuffer());

  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: 'Save video',
    defaultPath: path

  });

  if (filePath) {
    writeFile(filePath, buffer, () => console.log('video saved successfully!'));
  }

}

