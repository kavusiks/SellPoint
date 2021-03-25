from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import (
    RegisterSerializer,
    UserSerializer,
    AddressSerializer,
    ChangePasswordSerializer,
)
from django.contrib.auth.models import User


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


class UserUpdateAPIView(generics.GenericAPIView):
    """
    REST API View for updating user
    """

    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user_self = self.request.user
        serializer = RegisterSerializer(user_self, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            user_self.save()
            return Response({"user": UserSerializer(user).data})
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class AddressUpdateAPIView(generics.UpdateAPIView):
    """
    REST API view for editing the address field
    """

    permission_classes = [IsAuthenticated]

    def put(self, request):
        address = request.user.address
        serializer = AddressSerializer(address, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class SelfAPIView(generics.GenericAPIView):
    """
    REST API view for getting the user that is currently logged in.
    Supports GET requests
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_self = UserSerializer(request.user, read_only=True)
        return Response(user_self.data)


class ChangePasswordView(APIView):
    """
    An endpoint for changing password.
    """

    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": ["Wrong password."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
