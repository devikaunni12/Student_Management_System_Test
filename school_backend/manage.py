"""school_backend/manage.py

This file is the Django entry point for the backend.

Beginner-friendly notes:
- When you run `python manage.py runserver`, Django starts using this file.
- It sets the default settings module to `school_backend.settings`.
"""

import os
import sys


def main():
    # Use environment variable if set; otherwise fall back to default.
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "school_backend.settings")

    # Django's command-line utility.
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and available on your PYTHONPATH?"
        ) from exc

    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()

