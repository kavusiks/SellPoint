from .serializers import AdCreateSerializer, AdSerializer, ImageSerializer, FavoriteAdSerializer, FavoriteCreateSerializer
from .models import Ad, Image, FavoriteAd
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
        return Response(AdSerializer(ad).data)


class AdUserList(generics.ListCreateAPIView):
    """
    List-view for getting all ads owned by the currently logged in user
    """

    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        ads = self.get_queryset().filter(owner=request.user)
        serializer = AdSerializer(ads, many=True)
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

        print("Updating the thing!")

        return Response(ImageSerializer(image).data, status=status.HTTP_200_OK)


@api_view(["GET"])
def ad_not_sold_list(request):
    """
    Fetches all ads that are not sold
    """

    ads = Ad.objects.all().filter(is_sold=False)
    serializer = AdSerializer(ads, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def ad_all_list(request):
    """
    Fetches all ads
    """

    ads = Ad.objects.all()
    serializer = AdSerializer(ads, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def favorite_ads_list(request):
    favorite_ads = FavoriteAd.objects.all()
    serializer = FavoriteAdSerializer(favorite_ads, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def favorite_detail_user(request, pk):
    favorite_ad = FavoriteAd.objects.filter(user=pk).all()
    serializer = FavoriteAdSerializer(favorite_ad, many=True)
    return Response(serializer.data)


class FavoriteCreateAPIView(generics.CreateAPIView):
    serializer_class = FavoriteCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        favorite = serializer.save()

        return Response(FavoriteCreateSerializer(favorite, context=self.get_serializer_context()).data)


class FavoriteDeleteAPIView(generics.GenericAPIView):
    """
    View for deleting an instance of FavoriteAd
    """

    serializer_class = FavoriteAdSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = FavoriteAd.objects.all()

    # def get(self, request, pk):
    #     favorite_ad = FavoriteAd.objects.filter(user=request.user and favorite_ad=pk)
    #     return self.retrieve(self, request)

    # def delete(self, request,  pk):
    #     favorite_ad = FavoriteAd.objects.filter(user=request.user and favorite_ad=pk)

    #     if not favorite_ad:
    #         return Response(status=status.HTTP_404_NOT_FOUND)

    #     favorite_ad.delete()
    #     return Response(status=status.HTTP_200_OK)
