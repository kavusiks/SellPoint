from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.db.models.deletion import CASCADE
from sellpoint_ads.models import Ad
from sellpoint_auth.models import User

class FavoriteAd(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    favorite_ad_id = models.ForeignKey(Ad, on_delete=CASCADE)

    class Meta:
        unique_together = (("user", "favorite_ad_id"),)