from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class RegisterAPIView(generics.GenericAPIView):
    """
    REST API view for registering a new user. Supports POST
    requests
    """

    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "message": "User created successfully!",
            }
        )


class SelfAPIView(generics.GenericAPIView):
    """
    REST API view for getting the user that is currently logged in.
    Supports GET requests
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_self = UserSerializer(request.user, read_only=True)
        return Response(user_self.data)


class VisitUserAPIView(generics.GenericAPIView):
    """
    REST API view for getting a user by the given email.
    Supports GET requests
    """

    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, email, *args, **kwargs):
        user = get_user_model().objects.get(email=email)
        user_self = UserSerializer(user, read_only=True)
        return Response(user_self.data)
