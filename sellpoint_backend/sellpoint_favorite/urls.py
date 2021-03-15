from django.urls import path
from .views import favorite_ads_list

urlpatterns = [
    path("favorite-ads/", favorite_ads_list, name="favorite-ads"),
]