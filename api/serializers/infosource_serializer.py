from api.models.infosource import InfoSource
from rest_framework import serializers

class SourceSerializer(serializers.ModelSerializer):

    class Meta:
       model = InfoSource
       fields = '__all__'


