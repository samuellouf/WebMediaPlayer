viewer.videoElement.addEventListener("play", async function (){
  const delay = s => new Promise(res => setTimeout(res, s*1000));
  while (!viewer.isPaused()){
    if (!viewer.timeInput.matches(':active')){
      viewer.refreshTimeInput();
    }
    viewer.refreshTimeIndicators();
    await delay(0.00005);
  }
});

viewer.audioElement.addEventListener("play", async function (){
  const delay = s => new Promise(res => setTimeout(res, s*1000));
  while (!viewer.isPaused()){
    if (!viewer.timeInput.matches(':active')){
      viewer.refreshTimeInput();
    }
    viewer.refreshTimeIndicators();
    await delay(0.00005);
  }
});

viewer.timeInput.addEventListener("change", function (){
  viewer.refreshTimeIndicators();
});

// Load the languages

function getQueryOfElement(element){
  var elements = [];
  var e = null;
  elements.push(element);
  while (e != document.body){
    elements.push(elements[elements.length - 1].parentElement);
    e = elements[elements.length - 1];
  }
  elements.reverse();
  
  var query = '';

  for (var i in elements){
    query += elements[i].localName;

    if (elements[i].id != ''){
      query += '#' + elements[i].id;
    }

    if (elements[i].className != ''){
      if (elements[i].className.includes(' ')){
        query += '.' + elements[i].className.replaceAll(' ', '.');
      } else {
        query += '.' + elements[i].className
      }
    }
    
    if ((elements.length - 1) != i){
      query += ' ';
    }
  }

  return query;
}

function getQueryAllOfElement(element){
  let q = getQueryOfElement(element);
  let qall = [];

  for (var i=0; i < document.querySelectorAll(q).length; i++) {
    qall.push(document.querySelectorAll(q)[i])
  }
  
  return {query: q, index: qall.indexOf(element)};
}

function toggleSubtitlesMenu(){
  document.querySelector('.cc-menu').classList.remove('hidden');
  const removeCCMenu = (e) => {
    if (!getQueryOfElement(e.target).includes('.cc-menu')){
      document.querySelector('.cc-menu').classList.add('hidden');
      document.removeEventListener('click', removeCCMenu);
    }
  }
  document.addEventListener('click', removeCCMenu)
}
// Add these functions to your existing JavaScript
function toggleSpeedMenu() {
  const speedDropdown = document.getElementById('speedDropdown');
  speedDropdown.classList.toggle('hidden');
}

function showSpeedMenu() {
  document.querySelector('.speed-dropdown').classList.remove('hidden');
  const removeSMenu = (e) => {
    if (!getQueryOfElement(e.target).includes('.speed-dropdown')){
      document.querySelector('.speed-dropdown').classList.add('hidden');
      document.removeEventListener('click', removeSMenu);
    }
  }
  document.addEventListener('click', removeSMenu);
}

function setSpeed(speed) {
  // Update the playback speed
  if (speed == 'custom'){
    speed = Number(popups.prompt(ui_translator.getDialogInLanguage('enter_custom_speed'))); // translate
  }
  viewer.setSpeed(speed);

  // Update the displayed speed in the menu
  const selectedSpeed = document.getElementById('selectedSpeed');
  selectedSpeed.innerText = speed + 'x';

  // Hide the speed dropdown
  const speedDropdown = document.getElementById('speedDropdown');
  speedDropdown.classList.add('hidden');
}

// Create the Apps
let windows = new AppWindow();
windows.turnIntoApp("#settings-app");

function loadFile(file){
  let video_exts = ["3g2", "3gp", "aaf", "asf", "avchd", "avi", "drc", "flv", "m2v", "m3u8", "m4p", "m4v", "mkv", "mng", "mov", "mp2", "mp4", "mpe", "mpeg", "mpg", "mpv", "mxf", "nsv", "ogg", "ogv", "qt", "rm", "rmvb", "roq", "svi", "vob", "webm", "wmv", "yuv"];
  let image_exts = ["ase", "art", "bmp", "blp", "cd5", "cit", "cpt", "cr2", "cut", "dds", "dib", "djvu", "egt", "exif", "gif", "gpl", "grf", "icns", "ico", "iff", "jng", "jpeg", "jpg", "jfif", "jp2", "jps", "lbm", "max", "miff", "mng", "msp", "nef", "nitf", "ota", "pbm", "pc1", "pc2", "pc3", "pcf", "pcx", "pdn", "pgm", "PI1", "PI2", "PI3", "pict", "pct", "pnm", "pns", "ppm", "psb", "psd", "pdd", "psp", "px", "pxm", "pxr", "qfx", "raw", "rle", "sct", "sgi", "rgb", "int", "bw", "tga", "tiff", "tif", "vtf", "xbm", "xcf", "xpm", "3dv", "amf", "ai", "awg", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "gbr", "odg", "svg", "stl", "vrml", "x3d", "sxd", "v2d", "vnd", "wmf", "emf", "art", "xar", "png", "webp", "jxr", "hdp", "wdp", "cur", "ecw", "iff", "lbm", "liff", "nrrd", "pam", "pcx", "pgf", "sgi", "rgb", "rgba", "bw", "int", "inta", "sid", "ras", "sun", "tga", "heic", "heif"];
  let audio_exts = ["wav", "bwf", "raw", "aiff", "flac", "m4a", "pac", "tta", "wv", "ast", "aac", "mp2", "mp3", "mp4", "amr", "s3m", "3gp", "act", "au", "dct", "dss", "gsm", "m4p", "mmf", "mpc", "ogg", "oga", "opus", "ra", "sln", "vox"];
  let lyrics_exts = ["lrc"];
  
  if (video_exts.includes(file.split('.').pop())){
    viewer.setVideoSource(file);
    viewer.setMode('video');
  } else if (image_exts.includes(file.split('.').pop())){
    viewer.setImageSource(file);
    viewer.setMode('image');
  } else if (lyrics_exts.includes(file.split('.').pop())){
    viewer.importLyricsURI(file);
    viewer.setMode('video');
  } else if (audio_exts.includes(file.split('.').pop())){
    viewer.setAudioSource(file);
    viewer.setMode('audio');
  }
}

ui_translator.loadDialogs();

let params = new URLSearchParams(window.location.search);
if (params.get('url') != null){
  loadFile(params.get('url'));
}

if (params.get('lyrics') != null){
  loadFile(params.get('lyrics'));
}

if (params.get('mode') != null){
  viewer.setMode(params.get('mode'));
}

document.querySelector('app#settings-app.appwindow section.ui div.app .interface div.language select').value = ui_translator.getSelectedLanguage();

function reloadMenus(){
  defineMenus();
  window.video_menu = new ContextMenu(videoMenu);
  window.image_menu = new ContextMenu(imageMenu);
  window.audio_menu = new ContextMenu(audioMenu);

  window.cm = function(e){
    if (viewer.getMode() == 'video'){
      video_menu.display(e);
    } else if (viewer.getMode() == 'image'){
      image_menu.display(e);
    } else if (viewer.getMode() == 'audio'){
      audio_menu.display(e);
    }
  }
    
  document.querySelector('div.viewer').addEventListener("contextmenu", window.cm);
  document.querySelector('div.viewer div.players').addEventListener("contextmenu", window.cm);
  document.querySelector('div.viewer div.players video').addEventListener("contextmenu", function(e){
    video_menu.display(e);
  });
  document.querySelector('div.viewer div.players img').addEventListener("contextmenu", function(e){
    image_menu.display(e);
  });
  document.querySelector('div.viewer div.players div.audio').addEventListener("contextmenu", function(e){
    audio_menu.display(e);
  });
  ui_translator.loadDialogs();
}

reloadMenus();

try{
  viewer.reloadMenus = reloadMenus;
  viewer.videoElement.audioTracks.onaddtrack = reloadMenus;
  viewer.videoElement.audioTracks.onremovetrack = reloadMenus;
  viewer.videoElement.audioTracks.onchange = reloadMenus;
} catch (e) {}

document.querySelector('.cc-menu input.visible').checked = saves.getData('subtitles_visible');
document.querySelector('app#settings-app .ui .video input.subtitlesvisible').checked = saves.getData('subtitles_visible');

document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".content");

  tabs.forEach(tab => {
      tab.addEventListener("click", function() {
          // Remove active class from all tabs and contents
          tabs.forEach(tab => tab.classList.remove("active"));
          contents.forEach(content => content.classList.remove("active"));

          // Add active class to clicked tab and corresponding content
          tab.classList.add("active");
          const activeContent = document.querySelector('[target-id="' + tab.getAttribute("data-tab") + '"]');
          activeContent.classList.add("active");
      });
  });

  if (window.navigator.userAgent.includes('Mac OS X')){
    document.querySelector('.viewer .controls .tracks-btns').style.display = 'none';
  }
});

function exitFullscreen(){
  viewer.exitFullscreen();
}

function refreshServiceWorker(){
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  /* if (saves.getData('download_in_cache') == undefined){
    saves.setData('download_in_cache', true);
  }

  document.querySelector('input.downloadincache').checked = saves.getData('download_in_cache'); */

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('serviceWorker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    });
  }
});