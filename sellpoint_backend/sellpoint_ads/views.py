from .serializers import (
    AdCreateSerializer,
    AdSerializer,
    ImageSerializer,
    FavoriteAdSerializer,
    FavoriteCreateSerializer,
    CategorySerializer,
)
from .models import Ad, Image, FavoriteAd, Category
from django.http.response import (
    HttpResponse,
    HttpResponseBadRequest,
    HttpResponseForbidden,
    HttpResponseNotAllowed,
    HttpResponseNotFound,
)
from rest_framework import generics, status, mixins
from .renderers import JPEGRenderer, PNGRenderer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


class AdCreateAPIView(generics.CreateAPIView):
    """
    Special view for posting a new ad
    """

    serializer_class = AdCreateSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ad = serializer.save()

        return Response(AdSerializer(ad, context=self.get_serializer_context()).data)


class AdImageCreateAPIView(generics.CreateAPIView):
    """
    Special view for uploading an image for an ad
    """

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            image_file = request.data["image"]
            description = request.data.get("description")
            ad = Ad.objects.get(id=kwargs["id"])
        except KeyError:
            return HttpResponseBadRequest()

        if not ad:
            return HttpResponseNotFound()

        if not ad.owner == request.user:
            return HttpResponseForbidden()

        image = Image.objects.create(image=image_file, ad=ad, description=description)
        return Response(ImageSerializer(image).data)


class AdAPIView(mixins.RetrieveModelMixin, generics.GenericAPIView):
    """
    View for interacting with existing ads, allowing extensive information retrieval,
    updating and deleting.
    """

    serializer_class = AdSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Ad.objects.all()

    def get(self, request, pk):
        return self.retrieve(self, request, pk)

    def delete(self, request, pk):
        ad = Ad.objects.get(id=pk)
        if not ad:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not ad.owner == request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        ad.delete()
        return Response(status=status.HTTP_200_OK)

    def put(self, request, pk):
        ad = Ad.objects.get(id=pk)
        serializer = AdCreateSerializer(ad, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if not ad.owner == request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer.save()
        return Response(AdSerializer(ad, context=self.get_serializer_context()).data)


class AdUserList(generics.ListCreateAPIView):
    """
    List-view for getting all ads owned by the currently logged in user
    """

    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        ads = self.get_queryset().filter(owner=request.user)
        serializer = AdSerializer(ads, many=True, context=self.get_serializer_context())
        return Response(serializer.data)


class AdImageAPIView(generics.GenericAPIView):
    """
    General purpose view for interacting with images related to
    a listed ad
    """

    renderer_classes = (
        JPEGRenderer,
        PNGRenderer,
    )
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, pk):
        image = Image.objects.get(id=pk)
        return Response(image.image)

    def delete(self, request, pk):
        image = Image.objects.get(id=pk)
        if not image.ad.owner == request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        image.delete()
        return Response(status=status.HTTP_200_OK)

    def put(self, request, pk):
        image = Image.objects.get(id=pk)
        if not image.ad.owner == request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        description = request.data.get("description")
        image.description = description
        image.save()

        return Response(ImageSerializer(image).data, status=status.HTTP_200_OK)


class AdUserFavoriteList(generics.ListCreateAPIView):
    """
    List-view for getting all ads favorited by the currently logged in user
    """

    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        favorite_ad = FavoriteAd.objects.filter(user=request.user).all()
        serializer = AdSerializer(
            (fav.favorite_ad for fav in favorite_ad),
            many=True,
            context=self.get_serializer_context(),
        )
        return Response(serializer.data)


class AdListView(generics.ListAPIView):
    """
    Fetches all ads
    """

    queryset = Ad.objects.all()
    serializer_class = AdSerializer


class AdNotSoldListView(generics.ListAPIView):
    """
    Fetches all ads that are not sold
    """

    queryset = Ad.objects.all().filter(is_sold=False)
    serializer_class = AdSerializer


@api_view(["GET"])
def category_all_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def favorite_ads_list(request):
    favorite_ads = FavoriteAd.objects.all()
    serializer = FavoriteAdSerializer(favorite_ads, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_category(request, pk):
    category = Category.objects.get(id=pk)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(["GET"])
def favorite_detail_user(request, pk):
    favorite_ad = FavoriteAd.objects.filter(user=pk).all()
    serializer = FavoriteAdSerializer(favorite_ad, many=True)
    return Response(serializer.data)


class CategoryAdsView(generics.GenericAPIView):
    serializer_class = AdSerializer

    def get(self, request, category_id):
        ads = Ad.objects.all().filter(category=category_id)
        serializer = AdSerializer(ads, many=True, context=self.get_serializer_context())
        return Response(serializer.data)


@api_view(["GET"])
def favorite_detail(request, user_id, ad_id):
    permission_classes = [IsAuthenticated]

    favorite_ad = FavoriteAd.objects.get(user=user_id, favorite_ad=ad_id)
    serializer = FavoriteAdSerializer(favorite_ad, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
def favorite_delete(request, user_id, ad_id):
    favorite_ad = FavoriteAd.objects.get(user=user_id, favorite_ad=ad_id)
    favorite_ad.delete()
    return Response("Item successfully deleted!")


class FavoriteCreateAPIView(generics.CreateAPIView):
    serializer_class = FavoriteCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        favorite = serializer.save()

        return Response(
            FavoriteCreateSerializer(
                favorite, context=self.get_serializer_context()
            ).data
        )
