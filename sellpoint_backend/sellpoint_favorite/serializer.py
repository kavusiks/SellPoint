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