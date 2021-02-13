from rest_framework import serializers
from .models import Ad, Category

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('name')
        
class AdSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ad
        fields = ('title', 'description', 'price', 'created_at', 'last_modified', 'is_sold', 'image')
        #need to add category-field




    

