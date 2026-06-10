"""school_backend/urls.py

This file wires up the Django URL routes.

We expose:
- /api/ endpoints from DRF
- admin site
"""

from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("students.urls")),
]


