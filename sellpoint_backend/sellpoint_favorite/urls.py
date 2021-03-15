from django.urls import path
from .views import favorite_ads_list, AdCreateAPIView

urlpatterns = [
    path("list/", favorite_ads_list, name="favorite-ads"),
    path("create/", AdCreateAPIView.as_view(), name="favorite-create"),
]