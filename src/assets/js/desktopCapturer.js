const {desktopCapturer} = require('electron');


let desktopSharing = false;
let localStream;
let cameraSharing = false;

// function refresh() {
//   $('select').append({
//     hide_select : true
//   });
// }

function addSource(source) {
  $('select').append($('<option>', {
    value: source.id.replace(":", ""),
    text: source.name
  }));
  $('select option[value="' + source.id.replace(":", "") + '"]').attr('data-img-src', source.thumbnail.toDataURL());
  
}

function showSources() {
  desktopCapturer.getSources({ types:['window', 'screen'] }).then(async sources => {
    for (let source of sources) {
      console.log("Name: " + source.name);
      addSource(source);
    }
  });
}

function toggle() {
  if (!desktopSharing) {
    var id = ($('select').val()).replace(/window|screen/g, function(match) { return match + ":"; });
    onAccessApproved(id);
  } else {
    desktopSharing = false;

    if (localStream)
      localStream.getTracks()[0].stop();
    localStream = null;

    document.getElementById('button-start-stop')

    $('select').showSources();
    
    
  }
}

function onAccessApproved(desktop_id) {
  if (!desktop_id) {
    console.log('Desktop Capture access rejected.');
    return;
  }
  desktopSharing = true;
  document.getElementById('button-start-stop')
  console.log("Desktop sharing started.. desktop_id:" + desktop_id);
  navigator.webkitGetUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: desktop_id,
        minWidth: 1280,
        maxWidth: 1280,
        minHeight: 720,
        maxHeight: 720
      }
    }
  }, gotStream, getUserMediaError);

  function gotStream(stream) {
    localStream = stream;
    let video = document.getElementById('screen');
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
    stream.onended = function() {
      if (desktopSharing) {
        toggle();
      }
    };
  }

  function getUserMediaError(e) {
    console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
  }
}

$(document).ready(function() {
  showSources();

});

document.getElementById('button-start-stop').addEventListener('click', function(e) {
  toggle();
});



function getCamera() {
  
  var camera = navigator.mediaDevices.getUserMedia({video: true})
.then(function(stream){

  document.getElementById('camera').srcObject = stream;

}).catch(function(error) {

  console.log(error);

})

}

document.getElementById('start-camera').addEventListener('click' , function() {

  getCamera()

})


