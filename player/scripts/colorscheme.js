class ColorScheme{
  constructor(){
    this.schemes = ['system', 'light', 'dark', 'orange', 'red'];
    if (saves.getData('color_scheme') == null){
      saves.setData('color_scheme', 'system');
    }
  }

  light(){
    document.getElementById('color_scheme').href = 'themes/basic_light.css';
    saves.setData('color_scheme', 'basic_light');
  }

  dark(){
    document.getElementById('color_scheme').href = 'themes/basic_dark.css';
    saves.setData('color_scheme', 'basic_dark');
  }

  change(scheme){
    if (scheme == 'system'){
      this.system();
    } else {
      document.getElementById('color_scheme').href = 'themes/' + scheme + '.css';
    }
    saves.setData('color_scheme', scheme);
  }

  system(){
    if (window.matchMedia("(prefers-color-scheme: light)").matches){
      this.light();
    } else {
      this.dark();
    }
  }

  load(){
    this.change(saves.getData('color_scheme'));
    document.querySelector('#settings-app .app .interface .color-scheme select').value = saves.getData('color_scheme') || 'basic_light';
  }
}

const system_theme = () => {
  if (!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    return 'light';
  } else {
    return 'dark';
  }
}

// Load the Color Scheme
let color_scheme = new ColorScheme();
color_scheme.load();