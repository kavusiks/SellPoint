from rest_framework import serializers
from .models import Ad, Image, FavoriteAd, Category
from sellpoint_auth.models import Address, User


class LimitedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "phone_number"]


class ImageSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source="get_url", read_only=True)

    class Meta:
        model = Image
        fields = ["id", "url", "description"]


class AdCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ["title", "description", "price", "category", "is_sold"]

    def create(self, validated_data):
        owner = self.context["request"].user
        return Ad.objects.create(owner=owner, **validated_data)


class AdSerializer(serializers.ModelSerializer):
    owner = LimitedUserSerializer()
    thumbnail = ImageSerializer(source="get_thumbnail", required=False)
    images = ImageSerializer(source="get_images", many=True, required=False)
    distance = serializers.SerializerMethodField(read_only=True)

    def get_distance(self, obj):
        try:
            user = self.context["request"].user
            if not user.is_authenticated:
                return -1

            owner_address = obj.owner.address
            self_address = user.address
            return max(1, owner_address.distance(self_address))
        except Address.DoesNotExist:
            return 0

    class Meta:
        model = Ad
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
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
