"""students/login.py

This file contains the DRF API view for the /api/login endpoint.

Beginner-friendly notes:
- The endpoint accepts username/password and returns a token.
- We use Django's authenticate() to verify credentials.
"""

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class LoginAPIView(APIView):
    """Handle login requests and return a DRF token."""

    # Allow public access so the frontend can login.
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """Verify username/password and return (or create) a token."""

        username = request.data.get("username")
        password = request.data.get("password")


        # Authenticate checks username/password using Django auth.
        user = authenticate(request, username=username, password=password)

        if not user:
            # If credentials are wrong, return a 400 with a clear message.
            return Response({"detail": "Invalid username or password"}, status=400)

        # Create a token if one doesn't already exist for this user.
        token, _ = Token.objects.get_or_create(user=user)

        return Response({"token": token.key})

