class Language{ // translate
  constructor(){
    if (localStorage.getItem('ui_language') == null){
      localStorage.setItem('ui_language', 'system');
    }
    this.selected_language = localStorage.getItem('ui_language');
    this.real_selected_language = '?';
    
    this.selectLanguage(this.selected_language);

    this.languages = {};

  }

  selectLanguage(language){
    this.selected_language = language;
    localStorage.setItem('ui_language', language);
    
    if (localStorage.getItem('ui_language') == 'system'){
      this.real_selected_language = (window.navigator.userLanguage || window.navigator.language).split('-')[0];
    } else {
      this.real_selected_language = localStorage.getItem('ui_language')
    }
  }

  getSelectedLanguage(){
    return this.real_selected_language;
  }

  getLanguages(){ // dialogs
    return {
      'en': {
        'set_volume_to': 'Set volume to :',
        'enter_custom_speed': 'Enter a custom speed :',
        'play_pause': 'Play / Pause',
        'set_mode_to': 'Set mode to',
        'image': 'Image',
        'video': 'Video',
        'audio': 'Audio',
        'fullscreen_on_off': 'Fullscreen on/off',
        'picture_in_picture_on_off': 'Picture in Picture on/off',
        'loop_on_off': 'Loop on/off',
        'mute_on_off': 'Mute on/off',
        'custom_speed': 'Custom speed',
        'change_speed': 'Change speed',
        'import_file': 'Import file',
        'volume': 'Volume',
        'settings': 'Settings',
        'interface': 'Interface',
        'colorscheme': 'Color scheme',
        'language': 'Language',
        'import_subtitles': 'Import subtitles',
        'vfc': 'Video Frame Capture',
        'vfc_congrats': 'Capture was successfull!',
        'vfc_bigger': 'Fullscreen Capture',
        'vfc_download': 'Download Capture',
        'vfc_capture_current': 'Capture the current frame',
        'vfc_capture_custom': 'Capture a custom frame',
        'vfc_custom': 'Frame to capture (in seconds or H:M:S)',
        'track': 'Track',
        'audio_tracks': 'Audio tracks',
        'select_audio_track': 'Select an audio track',
        'play_audio_track': 'Play audio track',
        'label': 'Label',
        'language': 'Language',
        'id': 'Id',
        'track_language_und': 'Undefined',
        'track_language_zxx': 'No linguistic content',
        'track_language_mul': 'Multiple languages',
        'track_language_qaa': 'Reserved for local use',
        'track_language_mis': 'Encoded languages',
        'video_tracks': 'Video tracks',
        'select_video_track': 'Select a video track',
        'play_video_track': 'Play the video track',
        'file_name': 'File name',
        'duration': 'Duration',
        'subtitles': 'Subtitles',
        'enable_subtitles': 'Enable subtitles',
        'system': 'System',
        'basic_light': 'Light',
        'basic_dark': 'Dark',
        'red': 'Red',
        'orange': 'Orange',
      },
      'fr': {
        'set_volume_to': 'Mettre le volume à :',
        'enter_custom_speed': 'Mettre la vitesse :',
        'play_pause': 'Lecture / Pause',
        'set_mode_to': 'Passer au mode',
        'image': 'Image',
        'video': 'Video',
        'audio': 'Audio',
        'fullscreen_on_off': 'Plein écran on/off',
        'picture_in_picture_on_off': 'Picture in Picture on/off',
        'loop_on_off': 'Lecture en boucle on/off',
        'mute_on_off': 'Couper/Activer le son',
        'custom_speed': 'Vitesse personalisée',
        'change_speed': 'Changer la vitesse',
        'import_file': 'Importer un fichier',
        'volume': 'Volume',
        'settings': 'Paramètres',
        'interface': 'Interface',
        'colorscheme': 'Thème de couleurs',
        'language': 'Langue',
        'import_subtitles': 'Importer des sous-titres',
        'vfc': 'Capture de Frame d\'une vidéo',
        'vfc_congrats': 'La capture à été réussie!',
        'vfc_bigger': 'Mettre la Capture en plein écran',
        'vfc_download': 'Télécharger la Capture',
        'vfc_capture_current': 'Capturer la frame actuelle',
        'vfc_capture_custom': 'Capturer une autre frame',
        'vfc_custom': 'Frame a capturer (en secondes ou H:M:S)',
        'track': 'Piste',
        'audio_tracks': 'Pistes audio',
        'select_audio_track': 'Selectionnez une piste audio',
        'play_audio_track': 'Jouer la piste audio',
        'label': 'Nom',
        'language': 'Langue',
        'id': 'Identifiant',
        'track_language_und': 'Indéfini',
        'track_language_zxx': 'Aucun contenu linguistique',
        'track_language_mul': 'Plusieurs langues',
        'track_language_qaa': 'Réservée pour une utilisation locale',
        'track_language_mis': 'Languages encodés',
        'video_tracks': 'Pistes vidéo',
        'select_video_track': 'Selectionnez une piste vidéo',
        'play_video_track': 'Jouer la piste vidéo',
        'file_name': 'Nom du fichier',
        'duration': 'Durée',
        'subtitles': 'Sous-titres',
        'enable_subtitles': 'Activer les sous-titres',
        'system': 'Système',
        'basic_light': 'Lumineux',
        'basic_dark': 'Sombre',
        'red': 'Rouge',
        'orange': 'Orange',
      }
    }
  }

  loadDialogs(){
    document.querySelectorAll('[t_id]').forEach((e) => {
      if (e.getAttribute('t_id').includes(':')){
        e[e.getAttribute('t_id').split(':')[0]] = ui_translator.getDialogInLanguage(e.getAttribute('t_id').split(':')[1])
      } else {
        e.innerText = ui_translator.getDialogInLanguage(e.getAttribute('t_id'));
      }
    });
  }
  
  getDialogInLanguage(dialog, language = this.getSelectedLanguage()){
    return this.getLanguages()[language][dialog];
  }
}

let ui_translator = new Language();