"""students/views.py

This file defines the DRF API views for student CRUD.

Beginner-friendly notes:
- API views handle HTTP methods: GET, POST, PUT, DELETE.
- We enforce authentication using TokenAuthentication.
"""

from rest_framework import generics, permissions

from .models import Student
from .serializers import StudentSerializer


class StudentListCreateAPIView(generics.ListCreateAPIView):
    """List all students (GET) and create a new student (POST)."""

    queryset = Student.objects.all().order_by("-enrollment_date", "id")
    serializer_class = StudentSerializer

    # Auth required as per specification.
    permission_classes = [permissions.IsAuthenticated]


class StudentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a student by id."""

    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # Auth required as per specification.
    permission_classes = [permissions.IsAuthenticated]

