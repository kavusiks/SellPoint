from django.http.response import HttpResponse, HttpResponseBadRequest
from rest_framework import generics, mixins, status
from .serializers import AdCreateSerializer, AdSerializer, ImageSerializer, FavoriteAdSerializer, FavoriteCreateSerializer
from .models import Ad, Image, FavoriteAd
from .renderers import JPEGRenderer, PNGRenderer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class AdCreateAPIView(generics.CreateAPIView):
    serializer_class = AdCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ad = serializer.save()

        return Response(AdSerializer(ad, context=self.get_serializer_context()).data)


class AdImageCreateAPIView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        try:
            image_file = request.data["image"]
            description = request.data.get("description")
            ad = Ad.objects.get(id=kwargs["id"])
        except KeyError:
            return HttpResponseBadRequest()

        image = Image.objects.create(
            image=image_file, ad=ad, description=description)
        return Response(ImageSerializer(image).data)


@api_view(["GET"])
def ad_not_sold_list(request):
    ads = Ad.objects.all().filter(is_sold=False)
    serializer = AdSerializer(ads, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def ad_all_list(request):
    ads = Ad.objects.all()
    serializer = AdSerializer(ads, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def ad_detail(request, pk):
    ads = Ad.objects.get(id=pk)
    serializer = AdSerializer(ads, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@renderer_classes(
    (
        JPEGRenderer,
        PNGRenderer,
    )
)
def ad_image_detail(request, pk):
    image = Image.objects.get(id=pk)
    return Response(image.image)


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


class FavoriteDeleteAPIView(mixins.RetrieveModelMixin, generics.GenericAPIView):
    """
    View for deleting an instance of FavoriteAd
    """

    serializer_class = FavoriteAdSerializer
    # permission_classes = [IsAuthenticated]
    queryset = FavoriteAd.objects.all()

    def get(self, request, user_id, ad_id):
        return self.retrieve(self, request, user_id, ad_id)

    def delete(self, request, user_id, ad_id):
        favorite_ad = FavoriteAd.objects.get(user=user_id, favorite_ad=ad_id)

        if not favorite_ad:
            return Response(status=status.HTTP_404_NOT_FOUND)

        favorite_ad.delete()
        return Response(status=status.HTTP_200_OK)
