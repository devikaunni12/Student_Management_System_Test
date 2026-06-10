"""school_backend/wsgi.py

WSGI config for Django.

This lets WSGI servers (like Gunicorn) run the app.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "school_backend.settings")

application = get_wsgi_application()

