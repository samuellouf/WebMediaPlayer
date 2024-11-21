class Saves{
  constructor(autosave = true){
    this.data = JSON.parse(localStorage.WebMediaPlayer_saves || '{}');
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
    localStorage.WebMediaPlayer_saves = JSON.stringify(this.data);
  }

  resetAll(){
    this.data = {};
    if (this.autosave) {
      this.saveData();
    }
  }
}

let saves = new Saves();