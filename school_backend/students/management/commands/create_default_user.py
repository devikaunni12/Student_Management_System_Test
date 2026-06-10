"""students/management/commands/create_default_user.py

This Django management command creates a default superuser.

It is designed to be idempotent:
- If the user already exists, it will not create duplicates.
- If it exists, it can optionally update the password.

Default credentials:
- username: admin
- password: admin123

Run:
    python manage.py create_default_user
"""

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Create the default superuser used for testing."""

    help = "Create default admin user (admin/admin123) if it doesn't exist"

    def handle(self, *args, **options):
        # Get the active user model.
        User = get_user_model()

        username = "admin"
        password = "admin123"

        # Try to find the user.
        user, created = User.objects.get_or_create(
            username=username,
            defaults={"is_superuser": True, "is_staff": True},
        )

        if created:
            # Set password only on creation.
            user.set_password(password)
            user.is_superuser = True
            user.is_staff = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f"Created default user: {username}"))
        else:
            # If the user already exists, ensure it has the expected flags.
            user.is_superuser = True
            user.is_staff = True
            # Also keep password aligned for beginner testing.
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f"User already existed; updated: {username}"))

