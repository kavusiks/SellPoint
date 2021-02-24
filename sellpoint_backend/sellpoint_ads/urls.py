from django.urls import path
from rest_framework import routers
from . import views


urlpatterns = [
    path("create/", views.AdCreateAPIView.as_view(), name="ad-create"),
    path('list/', views.ad_all_list, name="ad-list"),
    path('list/not-sold/', views.ad_not_sold_list, name="ad-not-sold-list"),
    path('<str:pk>/', views.ad_detail, name="ad-detail"),
]
