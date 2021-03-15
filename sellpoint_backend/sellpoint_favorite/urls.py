from django.urls import path
from .views import favorite_ads_list, FavoriteCreateAPIView

urlpatterns = [
    path("list/", favorite_ads_list, name="favorite-ads"),
    path("create/", FavoriteCreateAPIView.as_view(), name="favorite-create"),
]