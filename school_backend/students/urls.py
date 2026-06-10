"""students/urls.py

This file registers the API routes for the students app.

Required endpoints:
- POST /api/login
- GET/POST /api/students/
- GET/PUT/DELETE /api/students/{id}/

Beginner-friendly notes:
- /api/ prefix is added by the Django project URL conf.
"""

from django.urls import path

from .login import LoginAPIView
from .views import StudentListCreateAPIView, StudentRetrieveUpdateDestroyAPIView


urlpatterns = [
    # Login endpoint (returns token)
    path("login", LoginAPIView.as_view(), name="api-login"),

    # Student CRUD endpoints
    path("students/", StudentListCreateAPIView.as_view(), name="students-list"),
    path(
        "students/<int:pk>/",
        StudentRetrieveUpdateDestroyAPIView.as_view(),
        name="students-detail",
    ),
]

