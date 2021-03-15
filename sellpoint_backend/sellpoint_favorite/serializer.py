from rest_framework import serializers
from django.db import models
from sellpoint_favorite.models import FavoriteAd

class FavoriteAdSerializer(serializers.ModelSerializer):
    """
    Serializer for all favorite ads
    """

    class Meta:
        model = FavoriteAd
        fields = "__all__"

class FavoriteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteAd
        fields = ["user", "favorite_ad_id"]

    def create(self, validated_data):
        return FavoriteAd.objects.create(**validated_data)