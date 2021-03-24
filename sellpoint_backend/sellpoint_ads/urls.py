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
    path("category/list/", views.category_all_list, name="category-list"),
    path("category/<str:pk>/", views.get_category, name="category"),
    path("<str:pk>/", views.AdAPIView.as_view(), name="ad-detail"),
    path("image/<str:pk>/", views.AdImageAPIView.as_view(), name="ad-detail-image"),
    path("list/self/", views.AdUserList.as_view(), name="ad-user-list"),
]
