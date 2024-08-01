class Settings{
  constructor(autosave = true){
    this.data = JSON.parse(localStorage.settings || '{}');
    this.autosave = autosave;
  }

  setData(data, value){
    this.data[data] = value;
    if (this.autosave) {
      this.saveData();
    }
  }

  getData(data){
    return this.data[data];
  }

  removeData(data){
    delete this.data[data];
    if (this.autosave) {
      this.saveData();
    }
  }

  saveData(){
    localStorage.settings = JSON.stringify(this.data);
  }

  resetAll(){
    this.data = {};
    if (this.autosave) {
      this.saveData();
    }
  }
}

let settings = new Settings();