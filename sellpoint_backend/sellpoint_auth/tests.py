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
                                        last_name="Nordmann",
                                        phone_number="+4798989898")
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
    """
    Simple test case to test user login on API level
    """

    def setUp(self):
        user = User.objects.create_user("test@test.org",
                                        password="123",
                                        first_name="Ola",
                                        last_name="Nordmann",
                                        phone_number="+4798989898")
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


class UserRegisterTestCase(APITestCase):
    """
    Simple test case to test user registration on API level
    """
    def test_create_valid_user(self):
        """
        Ensure that a valid user can be created
        """
        
        url = reverse("user-register")

        data = {
            "email": "valid@mail.com",
            "first_name": "First Name",
            "last_name": "Last Name",
            "phone_number": "+4799998878",
            "password": "Password",
            "address": {
                "line1": "Address line 1",
                "line2": "Address line 2 (Optional)",
                "postalcode": "1234",
                "city": "City",
                "country": "Country"
            }
            }
        

        response = self.client.post(url, data, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verifying that the user was created sucessfully and added to the database
        body = response.data
        created_user = body.get("user")
        added_user = User.objects.get(email=created_user.get("email"))
        self.assertTrue(added_user != None)







    def test_create_user_invalid_phone_number(self):
        """
        Ensure that only phonenumbers with prefix "+" is accepted when creating an user
        """

        url = reverse("user-register")

        data = {
            "email": "valid@mail.com",
            "first_name": "First Name",
            "last_name": "Last Name",
            "phone_number": "99998878",
            "password": "Password",
            "address": {
                "line1": "Address line 1",
                "line2": "Address line 2 (Optional)",
                "postalcode": "1234",
                "city": "City",
                "country": "Country"
            }
            }
        

        response = self.client.post(url, data, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Verifying that the user was not created and not added to the database
        self.assertEqual(User.objects.filter(email="valid@mail.com").count(), 0)

    
    def test_create_user_invalid_email(self):
        """
        Ensure that only phonenumbers with prefix "+" is accepted when creating an user
        """

        url = reverse("user-register")

        data = {
            "email": "invalidmail.com",
            "first_name": "First Name",
            "last_name": "Last Name",
            "phone_number": "99998878",
            "password": "Password",
            "address": {
                "line1": "Address line 1",
                "line2": "Address line 2 (Optional)",
                "postalcode": "1234",
                "city": "City",
                "country": "Country"
            }
            }
        
        response = self.client.post(url, data, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Verifying that the user was not created and not added to the database
        self.assertEqual(User.objects.filter(email="valid@mail.com").count(), 0)
