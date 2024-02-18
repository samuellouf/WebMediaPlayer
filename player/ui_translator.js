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
        'language': 'Language'
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
        'language': 'Langue'
      }
    }
  }

  getDialogInLanguage(dialog, language = this.getSelectedLanguage()){
    return this.getLanguages()[language][dialog];
  }
}

let ui_translator = new Language();