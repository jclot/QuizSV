const { desktopCapturer, remote } = require('electron');
const { writeFile } = require('fs');
const { dialog, Menu } = remote;

const {spawn} = require('child_process');

const minimize = () => {

  remote.getCurrentWindow().minimize();

} 


// Global state
let mediaRecorder; // MediaRecorder instance to capture footage
const recordedChunks = [];
const currentWindow = remote.getCurrentWindow();
const python = spawn('python', ['../py/AppRunning.py']);

const extensionSelectBtn = document.getElementById('extensionFile')
extensionSelectBtn.onclick = getExtensionSources;


// Buttons
const videoElement = document.getElementById('screen');

let path;
  
const extensionFile = [
  
  "mp4",
  "avi",
  "mov",
  "webm",
  "none"

];
  
  
function pyFile() {

  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    console.log(data)
   });

   python.on('close', function (code) {
    console.log(`child process close all stdio with code ${code}`);
   
    });

}

const startBtn = document.getElementById('startBtn');

startBtn.onclick = () => {

  mediaRecorder.start();
  startBtn.classList.add('is-danger');
  startBtn.innerText = 'Recording...';
  minimize()

  
};


const stopBtn = document.getElementById('stopBtn');

stopBtn.onclick = e => {
 
  mediaRecorder.stop();
  startBtn.classList.remove('is-danger');
  startBtn.innerText = 'Start';
};

// const minimizeBtn = document.getElementById('minimizeBtn')

// minimizeBtn.onclick = e => {

//   minimize();

// }

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
        click: () => selectSource(source),
        
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


    pyFile();
    stream.getTracks()[0].stop()  
    currentWindow.reload();
 
    

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

function selectExtension(values) {
  
  extensionSelectBtn.innerText = values

  if(values === 'none') {

    return path = `untilted`;

  } else {

    return path = `vid-${Date.now()}.${values}`;
  
  }
}
function getExtensionSources() {


const videoExtensionMenu = Menu.buildFromTemplate(
  extensionFile.map(values => {
    return {
      label: values,   
      click: () => selectExtension(values)
      
      
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

// `vid-${Date.now()}.webm`


