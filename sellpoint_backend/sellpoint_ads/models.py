from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
#from sellpoint_auth import User

class Category(models.Model):
    name = models.CharField(max_length=200, unique=True, blank=False)

class Ad(models.Model):
    title = models.CharField(max_length=30, blank=False)
    description = models.TextField(max_length=350)
    price = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    is_sold = models.BooleanField(_('Is sold'), default=False)
    #location =
    #image = models.ImageField(_(""), upload_to=None, height_field=None, width_field=None, max_length=None)
    #owner = models.ForeignKey(User, on_delete=models.CASCADE)
    



