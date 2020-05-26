from rest_framework import viewsets
from api.serializers.infosource_serializer import SourceSerializer
from rest_framework.response import Response
from api.models.infosource import InfoSource
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
import json
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

class MyOwnView(APIView):
    def get(self, request, keyword):
        print(keyword)

        if(keyword == 'all'):
            queryset = InfoSource.objects.all()
        else:
            queryset = InfoSource.objects.filter(annotation__contains = keyword)
        sourcesArray = []

        for el in queryset:
            tempObj = {}
            tempObj['id'] = el.id
            tempObj['annotation'] = el.annotation
            tempObj['language_context'] = el.language_context
            tempObj['description'] = el.description
            tempObj['link_url'] = el.link_url
            tempObj['admin'] = el.admin.username
            tempObj['author'] = {
                                    "name": el.author.name,
                                    "surname": el.author.surname,
                                    "patronomyc": el.author.patronomyc,
                                }
            tempObj['domain'] = el.domain.url
            tempObj['category'] = el.category.name
            tempObj['publish_info'] = {
                                        "publish_place": el.publish_info.publish_place,
                                        "publish_year": el.publish_info.publish_year
                                      }

            sourcesArray.append(tempObj)

        return Response(sourcesArray)

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
    