from rest_framework import viewsets
from api.serializers.publish_serializer import PublishSerializer
from rest_framework.response import Response
from api.models.publish_info import PublishInfo
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated

class PublishInfoViewSet(viewsets.ModelViewSet):
    queryset = PublishInfo.objects.all()
    serializer_class = PublishSerializer
    permission_classes = (IsAuthenticated, )
    
    def get_queryset(self):
        return PublishInfo.objects.all()


    @action(methods=['delete'], detail=False, permission_classes=[IsAuthenticated])
    def bulk_delete(self, request, **kwargs):
        PublishInfo.objects.all().delete()
        return Response(dict(success=True), status=200)
    