from django.http.response import HttpResponse, HttpResponseBadRequest
from rest_framework import generics
from .serializers import AdCreateSerializer, AdSerializer, ImageSerializer
from .models import Ad, Image
from .renderers import JPEGRenderer, PNGRenderer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class AdCreateAPIView(generics.CreateAPIView):
    serializer_class = AdCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ad = serializer.save()

        return Response(AdSerializer(ad, context=self.get_serializer_context()).data)


class AdImageCreateAPIView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        try:
            image_file = request.data['image']
            description = request.data.get('description')
            ad = Ad.objects.get(id=kwargs["id"])
        except KeyError:
            return HttpResponseBadRequest()

        image = Image.objects.create(
            image=image_file, ad=ad, description=description)
        return Response(ImageSerializer(image).data)

class AdUpdateAPIView(generics.CreateAPIView):
    serializer_class = AdCreateSerializer
    permission_classes = [IsAuthenticated]

    #def put(self, request, *args,  **kwargs):

class AdUserList(generics.ListCreateAPIView):

    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        loggedInUser = self.context["request"].user
        ads = self.get_queryset().filter(owner = loggedInUser)
        serializer = AdSerializer(ads, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def ad_not_sold_list(request):
    ads = Ad.objects.all().filter(is_sold=False)
    serializer = AdSerializer(ads, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def ad_all_list(request):
    ads = Ad.objects.all()
    serializer = AdSerializer(ads, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def ad_detail(request, pk):
    ads = Ad.objects.get(id=pk)
    serializer = AdSerializer(ads, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@renderer_classes((JPEGRenderer, PNGRenderer,))
def ad_image_detail(request, pk):
    image = Image.objects.get(id=pk)
    return Response(image.image)
