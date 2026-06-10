"""students/models.py

This file defines the database models for the students app.

Beginner-friendly notes:
- A Django model corresponds to a database table.
- Each field becomes a column.
"""

from django.db import models


class Student(models.Model):
    """Student model storing school student information."""

    # Auto id field is added by Django automatically via BigAutoField
    # because we set DEFAULT_AUTO_FIELD in settings.

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30)
    date_of_birth = models.DateField()

    # Gender should be one of: Male / Female / Other
    gender = models.CharField(max_length=10)

    # Grade: Grade 1 to Grade 12 etc.
    grade = models.CharField(max_length=20)

    address = models.TextField()

    # Enrollment date is auto-added when the student is created.
    enrollment_date = models.DateField(auto_now_add=True)

    # Whether the student is active in the system.
    is_active = models.BooleanField(default=True)

    def __str__(self):
        # This makes the student readable in Django admin and logs.
        return f"{self.first_name} {self.last_name}"

