from rest_framework import viewsets
from api.serializers.infosource_serializer import SourceSerializer
from rest_framework.response import Response
from api.models.infosource import InfoSource
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated

class InfoSourceViewSet(viewsets.ModelViewSet):
    queryset = InfoSource.objects.all()
    serializer_class = SourceSerializer

    def get_queryset(self):
        return InfoSource.objects.filter(admin_id = self.request.user.id)


    @action(methods=['delete'], detail=False, permission_classes=[IsAuthenticated])
    def bulk_delete(self, request, **kwargs):
        InfoSource.objects.filter(admin_id = request.user.id).delete()
        return Response(dict(success=True), status=200)
    