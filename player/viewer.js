// Web Media Player by SamuelLouf (https://samuellouf.github.io/WebMediaPlayer) | v.1.0.0

class Viewer {
  constructor(keyboardShortcuts = false, playWhenLoaded = false) {
    this.viewer = document.querySelector('div.viewer');
    this.mode = 'video';

    this.videoElement = document.querySelector('div.viewer div.players video');
    this.audioElement = document.querySelector('div.viewer div.players div.audio audio');
    this.audioDiv = document.querySelector('div.viewer div.players div.audio');
    this.fileName = document.querySelector('div.viewer div.filename');
    this.imageElement = document.querySelector('div.viewer div.players img');
    this.imageFakeVideo = document.createElement('video');

    this.players = document.querySelector('div.viewer div.players').children;
    this.timeInput = document.querySelector('div.controls div.time input');
    this.volumeInput = document.querySelector('div.controls div.options div.volume input');
    this.timeIndicators = {
      time: document.querySelector('div.controls div.time span.time'),
      total_time: document.querySelector('div.controls div.time span.total-time'),
    };

    this.controls = document.querySelector('div.viewer div.controls');
    this.controls_picture_in_picture = document.querySelector('div.viewer div.controls div.options div.pip');
    this.loop = 'noloop';

    this.midiPlayer = null;

    this.playWhenLoaded = playWhenLoaded;

    this.videoElement.addEventListener("ended", function (){
      document.querySelector('div.viewer div.controls div.playpause .play').classList.remove('hidden');
      document.querySelector('div.viewer div.controls div.playpause .pause').classList.remove('hidden');
      document.querySelector('div.viewer div.controls div.playpause .pause').classList.add('hidden');
    });

    this.audioElement.addEventListener("ended", function (){
      document.querySelector('div.viewer div.controls div.playpause .play').classList.remove('hidden');
      document.querySelector('div.viewer div.controls div.playpause .pause').classList.remove('hidden');
      document.querySelector('div.viewer div.controls div.playpause .pause').classList.add('hidden');
    });

    this.loopOff();

    document.onmousemove = function(e){
      var fullscreen = 0;

      if (document.webkitIsFullScreen){
        fullscreen = 100;
      }

      if (window.outerHeight - e.clientY <= (240 - fullscreen)){
        document.querySelector('div.controls').classList.remove('hidden');
        // document.querySelector('div.subtitles').classList.add('up');
      } else {
        document.querySelector('div.controls').classList.add('hidden');
        // document.querySelector('div.subtitles').classList.remove('up');
      }
    }

    if (keyboardShortcuts){
      this.addKeyboardShortcuts();
    }

    if (playWhenLoaded){
      this.play();
    }

    this.setMode('video');
  }

  // Background functions
  blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  getPromiseFromEvent(item, event) {
    return new Promise((resolve) => {
      const listener = (e) => {
        item.removeEventListener(event, listener);
        resolve(e);
      }
      item.addEventListener(event, listener);
    })
  }

  // Keyboard shortcuts
  isKeyboardEventAltered(event){
    return (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
  }

  keyboardShortcuts(e) {
    const eval_code = (code) => {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerText = code;
      document.body.appendChild(script);
      document.body.removeChild(script);
      script.remove();
    }

    const isKeyboardEventAltered = (event) =>{
      return (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
    }
    // console.log(e);
    if (e.key === 'f' & !isKeyboardEventAltered(e)) {
      e.preventDefault();
      eval_code('viewer.toggleFullscreen();');
    } else if (e.key === 'F11' & !isKeyboardEventAltered(e)) {
      e.preventDefault();
      eval_code('viewer.toggleFullscreen();');
    } else if (e.key === 'm' & !isKeyboardEventAltered(e)) {
      e.preventDefault();
      eval_code('viewer.toggleMute();');
    } else if (e.key === 'l' & !isKeyboardEventAltered(e)) {
      e.preventDefault();
      eval_code('viewer.toggleLoop();');
    } else if (e.key === ' ' & !isKeyboardEventAltered(e)) {
      e.preventDefault();
      eval_code('viewer.toggleLecture();');
    } else if (e.key === 'ArrowLeft' & !isKeyboardEventAltered(e)) {
      if (e.repeat){
        e.preventDefault();
        eval_code('viewer.goBackward2();');
      } else {
        e.preventDefault();
        eval_code('viewer.goBackward();');
      }
    } else if (e.key === 'ArrowRight' & !isKeyboardEventAltered(e)) {
      if (e.repeat){
        e.preventDefault();
        eval_code('viewer.goForeward2();');
      } else {
        e.preventDefault();
        eval_code('viewer.goForeward();');
      }
    } else if (e.key === 'ArrowUp' & !isKeyboardEventAltered(e)) {
      if (e.repeat){
        e.preventDefault();
        eval_code('viewer.volumeUp2();');
      } else {
        e.preventDefault();
        eval_code('viewer.volumeUp();');
      }
    } else if (e.key === 'ArrowDown' & !isKeyboardEventAltered(e)) {
      if (e.repeat){
        e.preventDefault();
        eval_code('viewer.volumeDown2();');
      } else {
        e.preventDefault();
        eval_code('viewer.volumeDown();');
      }
    } else if ((e.keyCode === 219) & e.ctrlKey & e.shiftKey) {
      e.preventDefault();
      eval_code('viewer.togglePictureInPicture();'); // new AppWindow().turnIntoApp("#settings-app");
    } else if ((e.key === 'p') & e.ctrlKey) {
      e.preventDefault();
      eval_code('windows.toggleAppVisibility("#settings-app")');
    } else if ((e.key === 'l') & e.ctrlKey) {
      e.preventDefault();
    }
  }

  addKeyboardShortcuts() {
    document.addEventListener("keydown", this.keyboardShortcuts);
  }

  removeKeyboardShortcuts() {
    document.removeEventListener("keydown", this.keyboardShortcuts);
  }

  // Audio
  setAudioSource(url) {
    this.audioElement.src = url;
    this.audioElement.load();
    if (this.playWhenLoaded) this.play()
  }

  isPlayableByAudioElement(file) {
    if (file.type.split('/')[0] == 'audio'){
      var acceptedAudioFormats = ['flac', 'm4a', 'wav', 'weba', 'webm', 'mp3', 'ogg'];
      return acceptedAudioFormats.includes(file.name.split('.').pop());
    } else {
      return false;
    }
  }

  isMidi(file) {
    return file.type == 'audio/mid';
  }

  async importAudioFile() {
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var input = document.createElement('input');
    input.type = "file";
    input.accept = "audio/*";
    input.click();
    await this.getPromiseFromEvent(input, 'change');
    // document.querySelector('div.viewer div.loading').style.display = '';
    var file = input.files[0];
    // document.querySelector('div.viewer div.loading div.content h3 span').innerText = file.name;
    var b64 = await this.blobToBase64(file);
    if (this.isPlayableByAudioElement(file)){
      this.setAudioSource(b64);
      // await this.getPromiseFromEvent(this.audioElement, 'loadeddata');
      // document.querySelector('div.viewer div.loading').style.display = 'none';
    } else if (this.isMidi(file)){
      if (this.midiPlayer == null){
        if (confirm("To play this file, you need to install MIDIjs. Do you wish to continue?")){
          try{
            this.installMidiPlayer();
          } catch {
            alert("MIDIjs could not be imported.");
          }
        }
      }

      // document.querySelector('div.viewer div.loading').style.display = 'none';
    }
    this.fileName.children[0].innerText = file.name;
    await delay(0.2);
    while (!this.isPaused()){
      if (!this.timeInput.matches(':active')){
        this.refreshTimeInput();
      }
      this.refreshTimeIndicators();
      await delay(0.2);
    }
    if (this.playWhenLoaded){
      this.play();
    }
    this.fileName.classList.toggle('hidden');
    await delay(3);
    this.fileName.classList.toggle('hidden');
  }

  installMidiPlayer() {
    try {
      fetch('https://www.midijs.net/lib/midi.js');
      this.midiPlayer.scriptElement = document.createElement('script');
      this.midiPlayer.scriptElement.type = 'text/javascript';
      this.midiPlayer.scriptElement.src = 'https://www.midijs.net/lib/midi.js';
      document.body.appendChild(this.midiPlayer.scriptElement);
    } catch {
      throw new Error('Could not access "https://www.midijs.net/lib/midi.js".');
    }
  }

  // Video
  setVideoSource(url) {
    this.videoElement.children[0].src = url;
    this.videoElement.load();
    if (this.playWhenLoaded) this.play()
  }

  async importVideoFile() {
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var input = document.createElement('input');
    input.type = "file";
    input.accept = "video/*";
    input.click();
    await this.getPromiseFromEvent(input, 'change');
    var file = input.files[0];
    console.log(file.mozFullPath);
    // document.querySelector('div.viewer div.loading').style.display = '';
    // document.querySelector('div.viewer div.loading div.content h3 span').innerText = file.name;
    var b64 = await this.blobToBase64(file);
    this.setVideoSource(b64);
    await this.getPromiseFromEvent(this.videoElement, 'loadstart');
    // document.querySelector('div.viewer div.loading').style.display = 'none';
    if (this.playWhenLoaded){
      this.play();
    }
    this.fileName.children[0].innerText = file.name;
    this.fileName.classList.toggle('hidden');
    await delay(3);
    this.fileName.classList.toggle('hidden');
  }

  switchVideoToPC(){
    this.videoElement.style.width = '-webkit-fill-available';
    this.videoElement.style.height = '';
  }

  switchVideoToPhone(){
    this.videoElement.style.width = '';
    this.videoElement.style.height = window.outerHeight + 'px';
  }

  //// YouTube
  isYouTubeVideoURL(url){
    return url.includes('youtube.com/embed') || url.includes('youtu.be') || url.includes('youtube.com/watch?') || url.includes('youtube.com/shorts');
  }

  getIdOfYouTubeVideoURL(url){
    const itemOfFromString = (item, from, splitby) => {
      return String(from).split(String(splitby))[(Number(item) - 1)] || '';
    }
    
    if (url.includes('youtube.com/embed')){ // YouTube Embed Video
      return itemOfFromString(2, itemOfFromString(1, url, '?'), 'youtube.com/embed/');
    } else if (url.includes('youtu.be')){ // youtu.be short link
      return itemOfFromString(2, itemOfFromString(1, url, '?'), 'youtu.be/');
    } else if (url.includes('youtube.com/watch?')){ // youtube.com/watch?v={ID} - Basic YouTube url
      const queryString = '?' + itemOfFromString(2, url, '?');
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get('v');
    } else if (url.includes('youtube.com/shorts')){ // YouTube Shorts
      return url.replace('youtube.com/shorts/', '');
    } else {
      return null
    }
  }

  // Image
  setImageSource(url) {
    this.imageElement.src = url;
    if (this.playWhenLoaded) this.play()
  }

  async importImageFile() {
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var input = document.createElement('input');
    input.type = "file";
    input.accept = "image/*";
    input.click();
    await this.getPromiseFromEvent(input, 'change');
    var file = input.files[0];
    var b64 = await this.blobToBase64(file);
    this.setImageSource(b64);
    if (this.playWhenLoaded){
      this.play();
    }
    this.fileName.children[0].innerText = file.name;
    await delay(0.2);
    while (!this.isPaused()){
      if (!this.timeInput.matches(':active')){
        this.refreshTimeInput();
      }
      this.refreshTimeIndicators();
      await delay(0.2);
    }
    this.fileName.classList.toggle('hidden');
    await delay(3);
    this.fileName.classList.toggle('hidden');
  }

  // Both
  importFile(){
    if (this.getMode() == 'video'){
      this.importVideoFile();
    } else if (this.getMode() == 'audio'){
      this.importAudioFile();
    } else if (this.getMode() == 'image'){
      this.importImageFile();
    }
  }

  play() {
    this.getElementOfMode().play();
    document.querySelector('div.viewer div.controls div.playpause .play').classList.remove('hidden');
    document.querySelector('div.viewer div.controls div.playpause .pause').classList.remove('hidden');
    document.querySelector('div.viewer div.controls div.playpause .play').classList.add('hidden');
  }

  pause() {
    this.getElementOfMode().pause();
    document.querySelector('div.viewer div.controls div.playpause .play').classList.remove('hidden');
    document.querySelector('div.viewer div.controls div.playpause .pause').classList.remove('hidden');
    document.querySelector('div.viewer div.controls div.playpause .pause').classList.add('hidden');
  }

  isPaused() {
    return this.getElementOfMode().paused;
  }

  goBackward() {
    this.getElementOfMode().currentTime = (this.getElementOfMode().currentTime - 5);
  }

  goBackward2() {
    this.getElementOfMode().currentTime = (this.getElementOfMode().currentTime - 10);
  }

  goForeward() {
    this.getElementOfMode().currentTime = (this.getElementOfMode().currentTime + 5);
  }

  goForeward2() {
    this.getElementOfMode().currentTime = (this.getElementOfMode().currentTime + 5);
  }

  toggleLecture() {
    if (this.isPaused()){
      this.play();
    } else {
      this.pause();
    }
  }

  refreshSound() {
    this.getElementOfMode().volume = Number(this.volumeInput.value) / 100;
    if (Number(this.volumeInput.value) >= 75){
      document.querySelector('div.controls div.options div.volume svg g g path.c').style.display = '';
    } else {
      document.querySelector('div.controls div.options div.volume svg g g path.c').style.display = 'none';
    }

    if (Number(this.volumeInput.value) >= 25){
      document.querySelector('div.controls div.options div.volume svg g g path.b').style.display = '';
    } else {
      document.querySelector('div.controls div.options div.volume svg g g path.b').style.display = 'none';
    }
  }

  getMode() {
    return this.mode;
  }

  setMode(mode) {
    this.mode = mode;
    this.videoElement.pause();
    this.audioElement.pause();
    if (mode == 'video'){
      this.videoElement.style.display = '';
      this.audioDiv.style.display = 'none';
      this.imageElement.style.display = 'none';
      this.controls_picture_in_picture.style.display = '';
    } else if (mode == 'image'){
      this.videoElement.style.display = 'none';
      this.audioDiv.style.display = 'none';
      this.imageElement.style.display = '';
      this.controls_picture_in_picture.style.display = 'none';
    } else if (mode == 'audio'){
      this.videoElement.style.display = 'none';
      this.audioDiv.style.display = '';
      this.imageElement.style.display = 'none';
      this.controls_picture_in_picture.style.display = 'none';
    }
  }

  getElementOfMode(mode=this.getMode()) {
    if (mode == 'video'){
      return this.videoElement;
    } else if (mode == 'image'){
      return this.imageFakeVideo;
    } else {
      return this.audioElement;
    }
  }

  async openNetworkFlux() {
    var url = prompt('Open a network flux');
    if (type == 'image'){
      this.imageElement.src = url;
    } else if (type == 'video'){
      this.videoElement.children[0].src = url;
      this.videoElement.load();
    } else if (type == 'audio'){
      this.audioElement.src = url;
      this.audioElement.load();
    }
  }

  fullscreenOn() {
    try{
      this.viewer.webkitRequestFullScreen();
      document.querySelectorAll('div.controls div.options div.fullscreen svg').forEach(element => {element.classList.toggle('hidden')});
    } catch {
      // Guess we could't enter to fullscreen
    }
  }

  fullscreenOff() {
    document.querySelectorAll('div.controls div.options div.fullscreen svg').forEach(element => {element.classList.toggle('hidden')})
    try {
      document.webkitExitFullscreen();
    } catch {
      try {
        document.webkitCancelFullScreen();
      } catch {
        try {
          document.exitFullscreen();
        } catch {
          // Guess we could't exit fullscreen
          document.querySelectorAll('div.controls div.options div.fullscreen svg').forEach(element => {element.classList.toggle('hidden')})
        }
      }
    }
  }

  isFullscreen() {
    return document.webkitIsFullScreen;
  }

  toggleFullscreen() {
    if (this.isFullscreen()){
      this.fullscreenOff();
    } else {
      this.fullscreenOn();
    }
  }

  setFullscreen(value) {
    if (value){
      this.fullscreenOn();
    } else {
      this.fullscreenOff();
    }
  }

  pictureInPictureEnabled() {
    return document.pictureInPictureEnabled;
  }

  enablePictureInPicture() {
    document.pictureInPictureEnabled = true;
  }

  disablePictureInPicture() {
    document.pictureInPictureEnabled = false;
  }

  pictureInPictureOn() {
    if ((this.getMode() == 'video') & (this.pictureInPictureEnabled())){
      try {
        this.getElementOfMode().requestPictureInPicture();
      } catch {
        // Guess PIP mode is not available
      }
    }
  }
  
  pictureInPictureOff() {
    try {
      document.exitPictureInPicture();
    } catch {
      // Guess we could not exit PIP
    }
  }

  isPictureInPicture() {
    return document.pictureInPictureElement != null;
  }

  togglePictureInPicture(){
    if (this.isPictureInPicture()){
      this.pictureInPictureOff();
    } else {
      this.pictureInPictureOn();
    }
  }

  setSpeed(speed) {
    this.getElementOfMode().playbackRate = speed;
  }

  getSpeed() {
    return this.getElementOfMode().playbackRate;
  }

  getLoop() {
    return this.loop;
  }

  loopThis() {
    this.getElementOfMode().loop = true;
    this.setLoop('loopone');
    document.querySelector('div.controls div.options div.loop svg g g text tspan').style.display = '';
    document.querySelector('div.controls div.options div.loop svg g g g.arrow').setAttribute("stroke-width", 24);
  }

  loopOff() {
    this.getElementOfMode().loop = false;
    this.setLoop('noloop');
    document.querySelector('div.controls div.options div.loop svg g g text tspan').style.display = 'none';
    document.querySelector('div.controls div.options div.loop svg g g g.arrow').setAttribute("stroke-width", 12);
  }

  setLoop(loop) {
    this.loop = loop;
  }

  toggleLoop() {
    if (this.getLoop() == 'noloop'){
      this.loopThis();
    } else {
      this.loopOff();
    }
  }

  muteOn() {
    this.getElementOfMode().muted = true;
    this.volumeInput.disabled = true;
    document.querySelector('div.controls div.options div.volume svg g g g.vol').style.display = 'none';
  }

  muteOff() {
    this.getElementOfMode().muted = false;
    this.volumeInput.disabled = false;
    document.querySelector('div.controls div.options div.volume svg g g g.vol').style.display = '';
  }

  isMute() {
    return this.getElementOfMode().muted;
  }

  toggleMute() {
    if (this.isMute()){
      this.muteOff();
    } else {
      this.muteOn();
    }
  }

  volumeUp() {
    this.setVolume(Number(this.getVolume()) + 5);
  }

  volumeUp2() {
    this.setVolume(Number(this.getVolume()) + 10);
  }

  volumeDown() {
    this.setVolume(Number(this.getVolume()) - 5);
  }

  volumeDown2() {
    this.setVolume(Number(this.getVolume()) - 10);
  }

  setVolume(value){
    if (value == 'custom'){
      value = Number(prompt(ui_translator.getDialogInLanguage('set_volume_to'))); // translate
    }

    if (this.isMute()){
      this.volumeInput.disabled = false;
      this.volumeInput.value = value;
      this.volumeInput.disabled = true;
    } else {
      this.volumeInput.value = value;
      this.refreshSound();
    }
  }

  getVolume(){
    return this.volumeInput.value;
  }

  refreshElementTime() {
    try{
      this.getElementOfMode().currentTime = Number(this.timeInput.value) * this.getElementOfMode().duration / 1000;
    } catch {}
  }

  refreshTimeInput() {
    this.timeInput.value = this.getElementOfMode().currentTime / this.getElementOfMode().duration * 1000;
  }

  refreshTimeIndicators() {
    const seconds_to_hms = (seconds) => {
      var hms = new Date(seconds * 1000).toISOString().slice(11, 19);
      return {h: hms.split(':')[0], m: hms.split(':')[1], s: hms.split(':')[2]}
    }

    if (this.getElementOfMode().duration < 3600){
      this.timeInput.style.width = '90%';
    } else {
      this.timeInput.style.width = '80%';
    }

    if (this.getElementOfMode().duration < 3600){
      var hms = seconds_to_hms(this.getElementOfMode().duration);
      this.timeIndicators.total_time.innerText = hms.m + ':' + hms.s;
    } else {
      var hms = seconds_to_hms(this.getElementOfMode().duration);
      this.timeIndicators.total_time.innerText = hms.h + ':' + hms.m + ':' + hms.s;
    }

    if (this.getElementOfMode().duration < 3600){
      var hms = seconds_to_hms(this.getElementOfMode().currentTime);
      this.timeIndicators.time.innerText = hms.m + ':' + hms.s;
    } else {
      var hms = seconds_to_hms(this.getElementOfMode().currentTime);
      if (this.getElementOfMode().currentTime < 3600){
        this.timeIndicators.time.innerText = '00:' + hms.m + ':' + hms.s;
      } else {
        this.timeIndicators.time.innerText = hms.h + ':' + hms.m + ':' + hms.s;
      }
    }
  }
}
