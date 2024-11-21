import urllib.request
import json
import platform
import subprocess
import os
import shutil
import main

def fetch(url):
  return urllib.request.urlopen(url).read()

def canFetch(url):
  try:
    fetch(url)
  except:
    return False
  return True

def hasInternetConnection():
  return canFetch('https://www.google.com/')

def compareVersions(a, b):
  if a.count('.') == 0:
    a += '.0.0'
  elif a.count('.') == 1:
    a += '.0'

  if b.count('.') == 0:
    b += '.0.0'
  elif b.count('.') == 1:
    b += '.0'
    
  if a == b:
    return '='

  if a.count('.') == 2 and b.count('.') == 2:
    if a.split('.')[0] == b.split('.')[0]:
      if a.split('.')[1] == b.split('.')[1]:
        if int(a.split('.')[2]) < int(b.split('.')[2]):
          return '<'
        else:
          return '>'
      elif int(a.split('.')[1]) < int(b.split('.')[1]):
        return '<'
      else:
        return '>'
    elif int(a.split('.')[0]) < int(b.split('.')[0]):
      return '<'
    else:
      return '>'

def getLastestVersion():
  return json.loads(fetch('https://samuellouf.github.io/WebMediaPlayer/updates.json'))['lastest_version']

def isUpdateAvailable():
  update_url = 'https://samuellouf.github.io/WebMediaPlayer/updates.json'
  can_fetch = canFetch(update_url)
  if hasInternetConnection() and can_fetch:
    update = getLastestVersion()
    if compareVersions(main.__version__, update) == '<':
      return True

  return False

def getTemp():
  if platform.system() == 'Windows':
    return f'C:\\Users\\{os.getlogin()}\\AppData\\Local\\Temp\\WebMediaPlayer\\'
  elif platform.system() == 'Linux':
    path = None
    if os.path.exists('/tmp'):
      path = '/tmp'
    elif os.path.exists('/var/tmp'):
      path = '/var/tmp'
    elif os.path.exists('/usr/tmp'):
      path = '/usr/tmp'

    if path:
      path += '/WebMediaPlayer/'

    return path
  elif 'macOS' in platform.platform():
    if os.path.exists('/tmp'):
      return f'/tpm/WebMediaPlayer'
    else:
      path = subprocess.run(['echo', '$TMPDIR'], capture_output=True, encoding='UTF-8')
      if path[-1] != '/':
        path += '/'
        
      return path + 'WebMediaPlayer/'
  
def installTemp():
  try:
    temp = getTemp() # Get the temporary directory
    if not os.path.exists(temp): # Make the temporary directory
      os.makedirs(temp)
    temp_updater = temp + 'updater.py'
    shutil.copyfile('updater.py', temp_updater)
    return temp_updater
  except:
    return None
  
def getPython():
  def canRun(args):
    try:
      subprocess.run(args)
      return True
    except:
      return False
  
  if canRun(['py']):
    return 'py'
  elif canRun(['python3']):
    return 'python3'
  elif canRun(['python']):
    return 'python'

def update():
  if isUpdateAvailable():
    updater = installTemp()
    subprocess.run([getPython(), updater, f'--setup-path={os.path.abspath(os.path.dirname(__path__))}', f'--update-version={getLastestVersion()}'])
    return True
  return False