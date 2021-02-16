from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
import os
#from sellpoint_auth import User

def get_image_path(instance, filename):
    return os.path.join('photos', str(instance.id), filename)

class Category(models.Model):
    name = models.CharField(max_length=200, unique=True, blank=False)

    def __str__(self):
        return self.name

class Ad(models.Model):
    title = models.CharField(max_length=30, blank=False)
    description = models.TextField(max_length=350)
    price = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    is_sold = models.BooleanField(_('Is sold'), default=False)
    #location =
    #owner = models.ForeignKey(User, on_delete=models.CASCADE)
    #image = 

class Image(models.Model):
    image = models.ImageField(_("Image for one ad"), upload_to=get_image_path, height_field=None, width_field=None, max_length=None, null=True, blank=True)
    ad = models.ForeignKey(Ad, on_delete=models.CASCADE)




