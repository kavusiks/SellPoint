from rest_framework import generics
from .serializers import AdCreateSerializer, AdSerializer
from .models import Ad
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class AdCreateAPIView(generics.GenericAPIView):
    """
    REST API view for registering a new user. Supports POST
    requests
    """

    serializer_class = AdCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ad = serializer.save()

        return Response({
            "ad": AdSerializer(ad, context=self.get_serializer_context()).data,
            "message": "Ad created successfully!",
        })

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
    serializer = AdCreateSerializer(ads, many=False)
    return Response(serializer.data)
