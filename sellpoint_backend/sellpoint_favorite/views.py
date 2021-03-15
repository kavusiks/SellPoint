from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import FavoriteAdSerializer
from django.contrib.auth.models import User
from .models import FavoriteAd

@api_view(["GET"])
def favorite_ads_list(request):
    favorite_ads = FavoriteAd.objects.all()
    serializer = FavoriteAdSerializer(favorite_ads, many=True)
    return Response(serializer.data)