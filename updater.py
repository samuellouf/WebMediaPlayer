# DISCLAMER : do not run this file if you are not sure of what you are doing
import sys
import urllib
import urllib.request
import colorama
import zipfile
import os
import shutil

def getArgument(arg):
  for arg_ in sys.argv:
    if arg_.__contains__('-' + arg) or arg_.__contains__('--' + arg):
      if arg_.__contains__('='):
        return arg_.split('=')[1]
      else:
        return ''

  return None

def hasArgument(arg):
  return getArgument(arg) != None

def hasRequiredArgs():
  return hasArgument('setup-path') and hasArgument('update-version')

def downloadSourceCode(version, log = True, styles = True):
  if log:
    print(f'Downloading WebMediaPlayer {colorama.Fore.CYAN}v{version}{colorama.Fore.RESET}\'s code source')

  try:
    if os.path.exists('source-code.zip'):
      os.remove('source-code.zip')
    urllib.request.urlretrieve(f'https://github.com/samuellouf/WebMediaPlayer/archive/refs/heads/{version}.zip', 'source-code.zip')
    print(f'{colorama.Fore.GREEN}\033[1mSUCCESS\033[0m{colorama.Fore.RESET} : Source code was downloaded successfully')
    return True
  except:
    if log:
      print(f'{colorama.Fore.RED}\033[1mERROR\033[0m{colorama.Fore.RESET} : could not download the source code')
    return False
  
def extractSourceCode():
  try:
    zip = zipfile.ZipFile('source-code.zip')
  except:
    return (False, 'could-not-open-zip')
  
  try:
    zip.extractall('source-code')
  except:
    return (False, 'could-not-extract-zip')

  return (True, None)

def getSourceCodeBase():
  return 'source-code/' + os.listdir('source-code')[0]

def getDestinationBase():
  return getArgument('setup-path')

def getSourceCodeBaseAbs():
  return os.path.abspath('source-code/' + os.listdir('source-code')[0])

def fullylistdir(path, o_path = None):
  dir = []
  if o_path == None:
    o_path = path
  for e in os.listdir(path):
    dir.append(os.path.join(path, e).replace(o_path + '\\', '').replace(o_path + '/', ''))
    if os.path.isdir(os.path.join(path, e)):
      for f in fullylistdir(os.path.join(path, e), o_path):
        dir.append(f)
  return dir

def getRidOfUselessFiles(path):
  try:
    for file in fullylistdir(path):
      if not file in fullylistdir(getSourceCodeBaseAbs()):
        os.remove(os.path.join(path, file))
    return True
  except:
    return False

def installToPath(path):
  print('Updating WebMediaPlayer :')
  for file in fullylistdir(getSourceCodeBase()):
    print(f'Copying "\033[1m{file}\033[0m"...')
    if os.path.isdir(os.path.join(getSourceCodeBase(), file)) and os.path.exists(os.path.join(getSourceCodeBase(), file)):
      os.makedirs((os.path.join(getArgument('setup-path'), file.replace('\\', '/'))))
    
    if os.path.isfile(os.path.join(getSourceCodeBase(), file)):
      shutil.copyfile(os.path.join(getSourceCodeBase(), file.replace('\\', '/')), os.path.join(getArgument('setup-path'), file.replace('\\', '/')))
    print(f'{colorama.Fore.GREEN}\033[1mSuccessfully\033[0m{colorama.Fore.RESET} copied "\033[1m{file}\033[0m{colorama.Fore.RESET}"...')

def printdir(path):
  path = path.replace('\\', '/')
  for p in fullylistdir(path):
    p = p.replace('\\', '/')
    if p.count('/') == 1:
      n = 1
    else:
      n = 2
    print((p.count('/') - (path.count('/') + 1))*'  '+p.replace(path, '').split('/')[n])

def takeCareOfSourceCode():
  if hasRequiredArgs():
    if downloadSourceCode(getArgument('update-version')):
      esc = extractSourceCode()
      if esc[0]:
        print(f'{colorama.Fore.GREEN}\033[1mSUCCESS\033[0m{colorama.Fore.RESET} : The source code was successfully extracted')
        return True
      elif esc[1] == 'could-not-open-zip':
        print(f'{colorama.Fore.RED}\033[1mERROR\033[0m{colorama.Fore.RESET} : could not open zip')
      elif esc[1] == 'could-not-extract-zip':
        print(f'{colorama.Fore.RED}\033[1mERROR\033[0m{colorama.Fore.RESET} : could not extract zip')
  else:
    print(f'{colorama.Fore.RED}\033[1mERROR\033[0m{colorama.Fore.RESET} : one or more arguments are missing')

    if not hasArgument('setup-path'):
      print(f'  -> Argument "setup-path" is undefined')

    if not hasArgument('update-version'):
      print(f'  -> Argument "update-version" is undefined')
  
  return False

def takeCareOfInstall():
  getRidOfUselessFiles(getArgument('setup-path'))
  installToPath(getArgument('setup-path'))

def update():
  version = getArgument('update-version')
  os.makedirs(getArgument('setup-path'))
  if takeCareOfSourceCode():
    takeCareOfInstall()
    print(f'Finished installing WebMediaPlayer v.{version}!')

if __name__ == '__main___':
  update()