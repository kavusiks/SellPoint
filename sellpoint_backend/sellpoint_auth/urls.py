from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (
    SelfAPIView,
    RegisterAPIView,
    ChangePasswordView,
    AddressUpdateAPIView,
    VisitUserAPIView,
)

urlpatterns = [
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token-obtain"),
    path("refresh/", jwt_views.TokenRefreshView.as_view(), name="token-refresh"),
    path("register/", RegisterAPIView.as_view(), name="user-register"),
    path("self/", SelfAPIView.as_view(), name="user-self"),
    path("change/password/", ChangePasswordView.as_view(), name="change-password"),
    path("edit/address/", AddressUpdateAPIView.as_view(), name="addres-edit"),
    path("user/<int:id>/", VisitUserAPIView.as_view(), name="user-self"),
]
