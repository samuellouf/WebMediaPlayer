let viewer = new Viewer(true, true);

viewer.videoElement.addEventListener("play", async function (){
  const delay = s => new Promise(res => setTimeout(res, s*1000));
  while (!viewer.isPaused()){
    if (!viewer.timeInput.matches(':active')){
      viewer.refreshTimeInput();
    }
    viewer.refreshTimeIndicators();
    await delay(0.2);
  }
});

viewer.audioElement.addEventListener("play", async function (){
  const delay = s => new Promise(res => setTimeout(res, s*1000));
  while (!viewer.isPaused()){
    if (!viewer.timeInput.matches(':active')){
      viewer.refreshTimeInput();
    }
    viewer.refreshTimeIndicators();
    await delay(0.2);
  }
});

viewer.timeInput.addEventListener("change", function (){
  viewer.refreshTimeIndicators();
});

// Load the languages


// Add these functions to your existing JavaScript
function toggleSpeedMenu() {
  const speedDropdown = document.getElementById('speedDropdown');
  speedDropdown.classList.toggle('hidden');
}

function setSpeed(speed) {
  // Update the playback speed
  if (speed == 'custom'){
    speed = Number(prompt(ui_translator.getDialogInLanguage('enter_custom_speed'))); // translate
  }
  viewer.setSpeed(speed);

  // Update the displayed speed in the menu
  const selectedSpeed = document.getElementById('selectedSpeed');
  selectedSpeed.innerText = speed + 'x';

  // Hide the speed dropdown
  const speedDropdown = document.getElementById('speedDropdown');
  speedDropdown.classList.add('hidden');
}

var video_menu = new ContextMenu(videoMenu);
var image_menu = new ContextMenu(imageMenu);
var audio_menu = new ContextMenu(audioMenu);

var cm = function(e){
  if (viewer.getMode() == 'video'){
    video_menu.display(e);
  } else if (viewer.getMode() == 'image'){
    image_menu.display(e);
  } else if (viewer.getMode() == 'audio'){
    audio_menu.display(e);
  }
}
  
document.querySelector('div.viewer').addEventListener("contextmenu", cm);
document.querySelector('div.viewer div.players').addEventListener("contextmenu", cm);
document.querySelector('div.viewer div.players video').addEventListener("contextmenu", function(e){
  video_menu.display(e);
});
document.querySelector('div.viewer div.players img').addEventListener("contextmenu", function(e){
  image_menu.display(e);
});
document.querySelector('div.viewer div.players div.audio').addEventListener("contextmenu", function(e){
  audio_menu.display(e);
});

// Create the Apps
let windows = new AppWindow();
windows.turnIntoApp("#settings-app");

function loadFile(file){
  let video_exts = ["3g2", "3gp", "aaf", "asf", "avchd", "avi", "drc", "flv", "m2v", "m3u8", "m4p", "m4v", "mkv", "mng", "mov", "mp2", "mp4", "mpe", "mpeg", "mpg", "mpv", "mxf", "nsv", "ogg", "ogv", "qt", "rm", "rmvb", "roq", "svi", "vob", "webm", "wmv", "yuv"];
  let image_exts = ["ase", "art", "bmp", "blp", "cd5", "cit", "cpt", "cr2", "cut", "dds", "dib", "djvu", "egt", "exif", "gif", "gpl", "grf", "icns", "ico", "iff", "jng", "jpeg", "jpg", "jfif", "jp2", "jps", "lbm", "max", "miff", "mng", "msp", "nef", "nitf", "ota", "pbm", "pc1", "pc2", "pc3", "pcf", "pcx", "pdn", "pgm", "PI1", "PI2", "PI3", "pict", "pct", "pnm", "pns", "ppm", "psb", "psd", "pdd", "psp", "px", "pxm", "pxr", "qfx", "raw", "rle", "sct", "sgi", "rgb", "int", "bw", "tga", "tiff", "tif", "vtf", "xbm", "xcf", "xpm", "3dv", "amf", "ai", "awg", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "gbr", "odg", "svg", "stl", "vrml", "x3d", "sxd", "v2d", "vnd", "wmf", "emf", "art", "xar", "png", "webp", "jxr", "hdp", "wdp", "cur", "ecw", "iff", "lbm", "liff", "nrrd", "pam", "pcx", "pgf", "sgi", "rgb", "rgba", "bw", "int", "inta", "sid", "ras", "sun", "tga", "heic", "heif"];
  let audio_exts = ["wav", "bwf", "raw", "aiff", "flac", "m4a", "pac", "tta", "wv", "ast", "aac", "mp2", "mp3", "mp4", "amr", "s3m", "3gp", "act", "au", "dct", "dss", "gsm", "m4p", "mmf", "mpc", "ogg", "oga", "opus", "ra", "sln", "vox"];
  
  if (video_exts.includes(file.split('.').pop())){
    viewer.setVideoSource(file);
    viewer.setMode('video');
  } else if (image_exts.includes(file.split('.').pop())){
    viewer.setImageSource(file);
    viewer.setMode('image');
  } else if (audio_exts.includes(file.split('.').pop())){
    viewer.setAudioSource(file);
    viewer.setMode('audio');
  }
}

function loadDialogs(){
  document.querySelectorAll('ui').forEach((e) => {
    e.innerText = ui_translator.getDialogInLanguage(e.getAttribute('t_id'));
  });
}

loadDialogs();

let params = new URLSearchParams(window.location.search);
if (params.get('url') != null){
  loadFile(params.get('url'));
}

document.querySelector('app#settings-app.appwindow section.ui div.app div.pages div.interface div.language select').value = ui_translator.getSelectedLanguage();

