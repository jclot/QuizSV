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



def is_running(app):
    count = int(subprocess.check_output(["osascript",
                "-e", "tell application \"System Events\"",
                "-e", "count (every process whose name is \"" + app + "\")",
                "-e", "end tell"]).strip())
    return count > 0

 

def is_creating():

	with open( desktop + '/' + username + '.txt', 'w') as f:

		sys.stdout = f

		print(' ')
		print(' ')
		print('APLICACIONES ABIERTAS Y CERRADAS DURANTE LA PRUEBA: ')

		print('___________________________________')

		print(' ')
		print is_running("Visual Studio Code")
		print('(Visual Studio Code)')

		print('___________________________________')

		print(' ')
		print is_running("Google Chrome")
		print('(Google Chrome)')

		print('___________________________________')

		print(' ')
		print is_running("WhatsApp")
		print('(WhatsApp)')

		print('___________________________________')

		print(' ')
		print is_running("Safari")
		print('(Safari)')

		print('___________________________________')

		print(' ')
		print is_running("FireFox")
		print('(FireFox)')

		print('___________________________________')

		print(' ')
		print is_running("Spotify")
		print('(Spotify)')

		print('___________________________________')

		sys.stdout = original_stdout


is_creating()


