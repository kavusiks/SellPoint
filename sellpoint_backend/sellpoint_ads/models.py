from django.db import models
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from sellpoint_auth.models import User
import os
from django.urls import reverse
from sellpoint_project.settings import BASE_URL


def get_image_path(instance, filename):
    return os.path.join("photos", str(instance.ad.id), filename)


class Category(models.Model):
    name = models.CharField(max_length=64, unique=True, blank=False)

    def __str__(self):
        return self.name


class Ad(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField(max_length=512)
    price = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True
    )
    is_sold = models.BooleanField(default=False)
    thumbnail = models.ForeignKey(
        "Image",
        on_delete=models.RESTRICT,
        related_name="thumbnail_for",
        null=True,
        blank=True,
    )

    def get_images(self):
        return self.image_set.all()

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail

        images = self.get_images()
        if images:
            return images[0]

        return None

    def __str__(self):
        return self.title


class Image(models.Model):
    image = models.ImageField(
        upload_to=get_image_path, height_field=None, width_field=None, max_length=None
    )
    ad = models.ForeignKey(Ad, on_delete=CASCADE)
    description = models.CharField(max_length=256, blank=True, null=True)

    def get_url(self):
        return BASE_URL + reverse("ad-detail-image", args=[self.id])


class FavoriteAd(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    favorite_ad = models.ForeignKey(Ad, on_delete=CASCADE)

    class Meta:
        unique_together = (("user", "favorite_ad"),)
