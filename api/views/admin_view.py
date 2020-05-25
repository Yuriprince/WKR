from rest_framework import viewsets
from api.serializers.admin_serializer import *
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated

class AdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AdminSerializer

    def get_queryset(self):
        return User.objects.all()
