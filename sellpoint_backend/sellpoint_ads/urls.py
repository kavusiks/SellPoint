from django.urls import path
from rest_framework import routers
from . import views


urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('ad-list/', views.adList, name="ad-list"),
    path('ad-all-list/', views.adNotSoldList, name="ad-not-sold-list"),
	path('ad-detail/<str:pk>/', views.adDetail, name="ad-detail"),
	path('ad-create/', views.adCreate, name="ad-create"),
	path('ad-update/<str:pk>/', views.adUpdate, name="ad-update"),
	path('ad-delete/<str:pk>/', views.adDelete, name="ad-delete"),
]