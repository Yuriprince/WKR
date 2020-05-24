from rest_framework import viewsets
from api.serializers.domain_serializer import DomainSerializer
from rest_framework.response import Response
from api.models.domain import Domain
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated

class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    #permission_classes = (IsAuthenticated, )
    
    def get_queryset(self):
        return Domain.objects.all()


    @action(methods=['delete'], detail=False, permission_classes=[IsAuthenticated])
    def bulk_delete(self, request, **kwargs):
        Domain.objects.all().delete()
        return Response(dict(success=True), status=200)
    