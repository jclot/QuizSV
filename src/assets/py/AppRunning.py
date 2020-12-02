# Author: Julian Clot Cordoba
#!/usr/bin/env python2.7

import subprocess
import sys
import datetime
import os
import platform
import getpass


original_stdout = sys.stdout


username = getpass.getuser()
desktop = os.path.join(os.path.join(os.path.expanduser('~')), 'Desktop') 


type_of_system_integrate = os.name
type_of_operating_system = platform.system()
type_of_version_system = platform.release()



def is_running_os(app):
    count = int(subprocess.check_output(["osascript",
                "-e", "tell application \"System Events\"",
                "-e", "count (every process whose name is \"" + app + "\")",
                "-e", "end tell"]).strip())
    return count > 0

# def is_running_win(app):
# 	cmd = 'powershell "gps | where {$_.MainWindowTitle } | select Description'
# 	proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
# 	for line in proc.stdout:
#     	if line.rstrip():
#         	# only print lines that are not empty
#         	# decode() is necessary to get rid of the binary string (b')
#         	# rstrip() to remove `\r\n`
#         	print(line.decode().rstrip())

 

def is_creating_os():

		sys.stdout = f

		print(' ')
		print(' ')
		print('APLICACIONES ABIERTAS Y CERRADAS DURANTE LA PRUEBA: ')

		print('___________________________________')

		print(' ')
		print is_running_os("Visual Studio Code")
		print('(Visual Studio Code)')

		print('___________________________________')

		print(' ')
		print is_running_os("Google Chrome")
		print('(Google Chrome)')

		print('___________________________________')

		print(' ')
		print is_running_os("WhatsApp")
		print('(WhatsApp)')

		print('___________________________________')

		print(' ')
		print is_running_os("Safari")
		print('(Safari)')

		print('___________________________________')

		print(' ')
		print is_running_os("FireFox")
		print('(FireFox)')

		print('___________________________________')

		print(' ')
		print is_running_os("Spotify")
		print('(Spotify)')

		print('___________________________________')

		sys.stdout = original_stdout


is_creating_os()