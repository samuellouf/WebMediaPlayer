async function hasPython(){
  try{
    await fetch('./api/hasPythonAccess')
    return true
  } catch (e) {
    return false
  }
}

async function isUpdateAvailable(){
  if (await hasPython()){
    var available = (await fetch('./api/isUpdateAvailable')).json();
    return available['isAvailable'];
  }
  return null;
}

async function update(){
  if (await hasPython()){
    var available = (await fetch('./api/update')).json();
    return available['success'];
  }
}

windows.turnIntoApp('#update-app');
window.onload = async () => {
  document.querySelector('#update-app button.update').disabled = !(await isUpdateAvailable());
  document.querySelector('#update-app button.update').addEventListener('click', async () => {
    document.querySelector('#update-app .loading-spinner').classList.remove('hidden');
    var success = await update();
    document.querySelector('#update-app .loading-spinner').classList.add('hidden');
    if (success){
      alert('Successfully updated WebMediaPlayer');
      if (confirm('Do you want to restart WebMediaPlayer?')){
        window.location.reload();
      }
    } else {
      alert('Could not update WebMediaPlayer')
    }
  });
}