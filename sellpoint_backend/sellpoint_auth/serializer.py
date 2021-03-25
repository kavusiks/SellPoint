from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from sellpoint_auth.models import User, Address
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.core import exceptions
import django.contrib.auth.password_validation as validators


class AddressSerializer(serializers.ModelSerializer):
    """
    Serializes an address, excluding the user field
    """

    class Meta:
        model = Address
        fields = ("line1", "line2", "postalcode", "city", "country")


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for the register endpoint. Accepts the data we need to
    create a user.
    """

    address = AddressSerializer()

    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "first_name",
            "last_name",
            "phone_number",
            "address",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone_number=validated_data["phone_number"],
        )
        Address.objects.create(user=user, **validated_data["address"])
        return user

    def validate(self, validated_data):
        # here data has all the fields which have validated values
        # so we can create a User instance out of it
        user = User(
            validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone_number=validated_data["phone_number"],
        )

        # get the password from the data
        password = validated_data.get("password")

        errors = dict()
        try:
            # validate the password and catch the exception
            validators.validate_password(password=password, user=User)

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors["password"] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(RegisterSerializer, self).validate(validated_data)


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for returning a user. Includes all fields except password
    """

    address = AddressSerializer()

    class Meta:
        model = User
        fields = (
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "last_login",
            "address",
            "date_joined",
            "is_staff",
            "id",
        )
