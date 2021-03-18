from django.urls import path
from rest_framework import routers
from . import views


urlpatterns = [
    path("create/", views.AdCreateAPIView.as_view(), name="ad-create"),
    path(
        "create/image/<int:id>/",
        views.AdImageCreateAPIView.as_view(),
        name="ad-create-image",
    ),
    path("list/", views.ad_all_list, name="ad-list"),
    path("list/not-sold/", views.ad_not_sold_list, name="ad-not-sold-list"),
    path("<str:pk>/", views.ad_detail, name="ad-detail"),
    path("image/<str:pk>/", views.ad_image_detail, name="ad-detail-image"),
    path("list/favorite/", views.favorite_ads_list, name="favorite-list"),
    path("create/favorite/", views.FavoriteCreateAPIView.as_view(),
         name="favorite-create"),
    path("favorite/user/<str:pk>/", views.favorite_detail_user, name="favorite-detail"),
]
