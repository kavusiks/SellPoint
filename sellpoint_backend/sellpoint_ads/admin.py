from django.contrib import admin
from .models import Ad, Category, Image


class ImageInline(admin.StackedInline):
    model = Image


class AdAdmin(admin.ModelAdmin):
    model = Ad
    inlines = (ImageInline,)


admin.site.register(Category)
admin.site.register(Ad, AdAdmin)
