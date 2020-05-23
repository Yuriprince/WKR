from api.models.category import Category
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
       model = Category
       fields = '__all__'