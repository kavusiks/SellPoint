from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from sellpoint_auth.models import User, Address
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('line1', 'line2', 'postalcode', 'city', 'country')


class RegisterSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = User
        fields = ('id', 'email', 'password',
                  'first_name', 'last_name', 'address')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create(email=validated_data['email'],
                                   password=validated_data['password'],
                                   first_name=validated_data['first_name'],
                                   last_name=validated_data['last_name'])
        Address.objects.create(user=user, **validated_data['address'])
        return user


class UserSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name',
                  'phone_number', 'last_login', 'address')
