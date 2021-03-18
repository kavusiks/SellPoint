from rest_framework import serializers
from .models import Ad, Image, FavoriteAd
from sellpoint_auth.models import User


class LimitedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "phone_number"]


class ImageSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source="get_url", read_only=True)

    class Meta:
        model = Image
        fields = ["id", "url", "description"]


class AdCreateSerializer(serializers.ModelSerializer):
    category = serializers.IntegerField(required=False)

    class Meta:
        model = Ad
        fields = ["title", "description", "price", "category"]

    def create(self, validated_data):
        owner = self.context["request"].user
        return Ad.objects.create(owner=owner, **validated_data)


class AdSerializer(serializers.ModelSerializer):
    owner = LimitedUserSerializer()
    thumbnail = ImageSerializer(source="get_thumbnail", required=False)
    images = ImageSerializer(source="get_images", many=True, required=False)

    class Meta:
        model = Ad
        fields = "__all__"


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
        fields = ["user", "favorite_ad"]

    def create(self, validated_data):
        return FavoriteAd.objects.create(**validated_data)
