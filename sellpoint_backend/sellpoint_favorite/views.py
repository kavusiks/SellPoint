from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import FavoriteAdSerializer, FavoriteCreateSerializer
from django.contrib.auth.models import User
from .models import FavoriteAd
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

@api_view(["GET"])
def favorite_ads_list(request):
    favorite_ads = FavoriteAd.objects.all()
    serializer = FavoriteAdSerializer(favorite_ads, many=True)
    return Response(serializer.data)

class FavoriteCreateAPIView(generics.CreateAPIView):
    serializer_class = FavoriteCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        favorite = serializer.save()

        return Response(FavoriteCreateSerializer(favorite, context=self.get_serializer_context()).data)
