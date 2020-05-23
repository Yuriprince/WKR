from api.models.publish_info import PublishInfo
from rest_framework import serializers

class PublishSerializer(serializers.ModelSerializer):

    class Meta:
       model = PublishInfo
       fields = '__all__'


