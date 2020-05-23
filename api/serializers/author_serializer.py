from api.models.author import Author 
from rest_framework import serializers

class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
       model = Author
       fields = '__all__'

