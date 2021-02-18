from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from sellpoint_auth.models import User, Address
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password


class AddressSerializer(serializers.ModelSerializer):
    """
    Serializes an address, excluding the user field
    """
    class Meta:
        model = Address
        fields = ('line1', 'line2', 'postalcode', 'city', 'country')


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for the register endpoint. Accepts the data we need to
    create a user.
    """

    address = AddressSerializer()

    class Meta:
        model = User
        fields = ('email', 'password',
                  'first_name', 'last_name', 'phone_number', 'address')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'],
                                        password=validated_data['password'],
                                        first_name=validated_data['first_name'],
                                        last_name=validated_data['last_name'],
                                        phone_number=validated_data['phone_number'])
        Address.objects.create(user=user, **validated_data['address'])
        return user


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for returning a user. Includes all fields except password
    and id
    """

    address = AddressSerializer()

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name',
                  'phone_number', 'last_login', 'address')
