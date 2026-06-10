"""school_backend/asgi.py

ASGI config for Django.

Useful when running with ASGI servers (like Uvicorn).
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "school_backend.settings")

application = get_asgi_application()

