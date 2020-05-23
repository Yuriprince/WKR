from rest_framework import viewsets
from api.serializers.author_serializer import AuthorSerializer
from rest_framework.response import Response
from api.models.author import Author
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Author.objects.all()

    