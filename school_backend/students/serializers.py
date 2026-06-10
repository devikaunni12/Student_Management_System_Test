"""students/serializers.py

Serializers convert Django model instances to/from JSON.

Beginner-friendly notes:
- serializer.validate_* methods are used for custom validation.
- We use ModelSerializer for CRUD convenience.
"""

from rest_framework import serializers

from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    """Serializer for the Student model."""

    class Meta:
        model = Student
        # Include fields as required by the specification.
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "date_of_birth",
            "gender",
            "grade",
            "address",
            "enrollment_date",
            "is_active",
        ]

    def validate_gender(self, value: str) -> str:
        """Validate gender is one of the allowed values."""
        allowed = {"Male", "Female", "Other"}
        if value not in allowed:
            raise serializers.ValidationError("Gender must be Male, Female, or Other")
        return value

    def validate_phone(self, value: str) -> str:
        """Basic phone validation (beginner-friendly).

        Requirement: phone format validation.
        We'll implement a simple rule: allow digits, spaces, +, -, and length 7..20.
        """
        cleaned = value.strip()
        if not cleaned:
            raise serializers.ValidationError("Phone is required")

        import re

        if not re.match(r"^[0-9+\-\s]{7,20}$", cleaned):
            raise serializers.ValidationError(
                "Phone must be 7-20 characters and contain only digits, spaces, +, or -"
            )
        return cleaned

