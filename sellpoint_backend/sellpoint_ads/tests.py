from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken
from sellpoint_auth.models import User
from sellpoint_ads.models import Ad


class AdCreateTestCase(APITestCase):
    """
    Test case for creating ads
    """

    user = ""

    def setUp(self):
        """Sets up a user"""
        self.user = User.objects.create_user(
            "test@test.org",
            password="123",
            first_name="Ola",
            last_name="Nordmann",
            phone_number="+4798989898",
        )
        self.user = User.objects.get(email="test@test.org")

    def test_ad_valid_create(self):
        """ Checks if it possible to create one ad """

        token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + str(token))
        url = reverse("ad-create")
        data = {
            "title": "Test title",
            "description": "Test description",
            "price": "100",
        }
        response = self.client.post(url, data, format="json")

        # Checks if the ad is created
        self.assertTrue(Ad.objects.filter(id=response.data.get("id")).exists())
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Checks if the owner is the one that created the ad
        self.assertEqual(response.data.get("owner").get("email"), "test@test.org")

    def test_ad_create_invalid_user(self):
        """ Testing that it isnt possible to create an ad without user access token"""
        url = reverse("ad-create")
        data = {
            "title": "Test title",
            "description": "Test description",
            "price": "100",
        }
        response = self.client.post(url, data, format="json")

        # Checks that the ad isnt created
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(Ad.objects.filter(id=response.data.get("id")).exists())


class AdUpdateTestCase(APITestCase):
    """
    Test case for updating one ad
    """

    user = ""
    ad_data = ""

    def setUp(self):
        """Sets up user and ad"""
        self.user = User.objects.create_user(
            "test@test.org",
            password="123",
            first_name="Ola",
            last_name="Nordmann",
            phone_number="+4798989898",
        )
        self.user = User.objects.get(email="test@test.org")
        token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + str(token))
        url_create = reverse("ad-create")
        self.ad_data = {
            "title": "Test title",
            "description": "Test description",
            "price": "100",
        }
        self.client.post(url_create, self.ad_data, format="json")
        self.ad_update_data = {"title": "Updated title"}

    def test_ad_valid_update(self):
        """Create one ad, then
        testing that we can update one ad,
        only if we are the owner of the ad.
        """
        url_update = reverse("ad-update", args=["1"])
        response = self.client.put(url_update, self.ad_update_data, format="json")

        # Checks if the ad is updated
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Checks if the title is changed
        self.assertEqual(response.data.get("title"), self.ad_update_data.get("title"))
        self.assertEqual(
            Ad.objects.get(id=response.data.get("id")).title,
            self.ad_update_data.get("title"),
        )

    def test_ad_invalid_update(self):
        """
        Ensure that its not possible to update
        one ad unless you're the owner of the ad.
        """
        another_user = User.objects.create_user(
            "another_test@test.org",
            password="123",
            first_name="Ola",
            last_name="Nordmann",
            phone_number="+4798989898",
        )
        another_token = AccessToken.for_user(another_user)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + str(another_token))
        url_update = reverse("ad-update", args=["1"])
        response = self.client.put(url_update, self.ad_update_data, format="json")
        # Checks that its not possible to update the ad
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
