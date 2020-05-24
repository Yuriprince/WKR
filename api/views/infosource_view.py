from rest_framework import viewsets
from api.serializers.infosource_serializer import SourceSerializer
from rest_framework.response import Response
from api.models.infosource import InfoSource
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated

class InfoSourceViewSet(viewsets.ModelViewSet):
    queryset = InfoSource.objects.all()
    serializer_class = SourceSerializer
    #permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return InfoSource.objects.all()


    @action(methods=['delete'], detail=False, permission_classes=[IsAuthenticated])
    def bulk_delete(self, request, **kwargs):
        InfoSource.objects.all().delete()
        return Response(dict(success=True), status=200)
    