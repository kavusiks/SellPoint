from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AdSerializer
from .models import Ad

class AdViewSet(viewsets.ModelViewSet):
    queryset = Ad.objects.all().order_by('title')
    serializer_class = AdSerializer
