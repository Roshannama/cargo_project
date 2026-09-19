import sys

path = '/home/YOUR_USERNAME/cargo_login_site'
if path not in sys.path:
    sys.path.append(path)

from app import app as application
