from django.contrib.auth.models import User
from rest_framework import serializers

class AdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'