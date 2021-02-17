from django.test import TestCase
from sellpoint_auth.models import User, Address
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, Token


class UserModelTestCase(TestCase):
    """
    Simple test case to test data structure of user and address
    """

    def setUp(self):
        user = User.objects.create_user("test@test.org",
                                        password="123",
                                        first_name="Ola",
                                        last_name="Nordmann")
        Address.objects.create(user=user,
                               line1="Line1",
                               line2="Line2",
                               postalcode="1234",
                               city="SomeCity",
                               country="Norway"
                               )

    def test_password_obscurity(self):
        """
        Ensure password is not stored in plaintext
        """

        user = User.objects.get(email="test@test.org")
        self.assertNotEqual(user.password, "123")

    def test_address_exists(self):
        """
        Ensure that the correct address is associated with the user
        """

        user = User.objects.get(email="test@test.org")
        # An object that is not None will evaluate to True
        address = user.address
        self.assertTrue(address)

        self.assertEqual(address.line1, "Line1")
        self.assertEqual(address.line2, "Line2")
        self.assertEqual(address.postalcode, "1234")
        self.assertEqual(address.city, "SomeCity")
        self.assertEqual(address.country, "Norway")


class UserAuthenticateTestCase(APITestCase):
    def setUp(self):
        user = User.objects.create_user("test@test.org",
                                        password="123",
                                        first_name="Ola",
                                        last_name="Nordmann")
        Address.objects.create(user=user,
                               line1="Line1",
                               line2="Line2",
                               postalcode="1234",
                               city="SomeCity",
                               country="Norway"
                               )

    def test_log_in_valid(self):
        """
        Ensure we can log in
        """

        url = reverse("token-obtain")
        data = {
            "email": "test@test.org",
            "password": "123"
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        body = response.data

        # Verify that the tokens exist
        self.assertTrue(body.get("access"))
        self.assertTrue(body.get("refresh"))

        # Verify that the tokens are valid
        AccessToken(token=body["access"], verify=True)
        RefreshToken(token=body["refresh"], verify=True)

    def test_log_in_invalid_password(self):
        """
        Ensure we can not log in with invalid wrong password
        """
        url = reverse("token-obtain")

        data = {
            "email": "test@test.org",
            "password": "321"
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        body = response.data

        # Verify that the tokens exist
        self.assertFalse(body.get("access"))
        self.assertFalse(body.get("refresh"))

    def test_refresh_token(self):
        """
        Ensure we can refresh an access token using a refresh token
        """

        url = reverse("token-refresh")
        user = User.objects.get(email="test@test.org")
        token = RefreshToken.for_user(user)

        data = {
            "refresh": str(token)
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        body = response.data

        # Verify that the tokens exist
        self.assertTrue(body.get("access"))

        # Verify that the tokens are valid
        AccessToken(token=body["access"], verify=True)

    def test_self_view(self):
        """
        Ensure we can view our own user
        """

        url = reverse("user-self")
        user = User.objects.get(email="test@test.org")
        token = AccessToken.for_user(user)

        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + str(token))

        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        body = response.data
        
        # Make sure password isn't included
        self.assertFalse(body.get("password"))

        # This pretty much tells us it's the correct user
        self.assertEqual(user.email, body["email"])      
