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
    path("favorite/list/", views.favorite_ads_list, name="favorite-list"),
    path("favorite/create/", views.FavoriteCreateAPIView.as_view(),
         name="favorite-create"),
    path("favorite/user/<str:pk>/",
         views.favorite_detail_user, name="favorite-detail-user"),
    path("favorite/detail/<str:user_id>-<str:ad_id>/",
         views.favorite_detail, name="favorite-detail"),
    path("favorite/delete/<str:user_id>-<str:ad_id>/",
         views.favorite_delete, name="favorite-delete"),
    path("<str:pk>/", views.AdAPIView.as_view(), name="ad-detail"),
    path("image/<str:pk>/", views.AdImageAPIView.as_view(), name="ad-detail-image"),
    path("list/self/", views.AdUserList.as_view(), name="ad-user-list"),
]
