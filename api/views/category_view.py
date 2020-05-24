from rest_framework import viewsets
from api.serializers.category_serializer import CategorySerializer
from rest_framework.response import Response
from api.models.category import Category
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated, )
    
    def get_queryset(self):
        return Category.objects.all()


    @action(methods=['delete'], detail=False, permission_classes=[IsAuthenticated])
    def bulk_delete(self, request, **kwargs):
        Category.objects.all().delete()
        return Response(dict(success=True), status=200)
    