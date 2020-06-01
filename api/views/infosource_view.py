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
import requests
from bs4 import BeautifulSoup as BS
from bs4.element import NavigableString

class ParseView(APIView):
    def isnt_archive_link(self, url, el):
        if str(el).find('.zip') == -1:
            end = url.find('.ru/')
            return (url[:end] + '.ru' + str(el)) #.replace("https://", "")
        else:
            return (url) #.replace("https://", "")

    def parse_page(self, url, selector):
        r = requests.get(url)
        html = BS(r.content, 'html.parser')

        src_list = []
        dictionary = {}
        counter = 1

        for el in html.select(selector):

            if counter == 50:
                break

            if el.name == 'a':
                caret = el.text.find('\n')
                annotation = ''
                if caret != -1:
                    annotation = el.text[:caret].strip()
                else:
                    annotation = el.text.strip()
                src_list.append({'id': counter, 'title': annotation, 'url': self.isnt_archive_link(url, el.attrs['href'])})

            else:
                for subel in el.contents:
                    if type(subel) != NavigableString:
                        if subel.name == 'a':
                            caret = el.text.find('\n')
                            if caret != -1:
                                annotation = el.text[:caret].strip()
                            else:
                                annotation = el.text.strip()
                                src_list.append({'id': counter, 'title': annotation, 'url': self.isnt_archive_link(url, subel.attrs['href'])})
            counter+=1
        return src_list
                    
    def post(self, request):
        url = request.data['url']
        selector = request.data['selector']
        new_list = self.parse_page(url, selector)
        return Response(new_list)

class MyOwnView(APIView):
    def get(self, request, keyword):
        #print(keyword)

        keyArr = keyword.split('_')
        #print(keyArr)

        order_val = ''

        if(keyArr[1] == 'Аннотации'):
            order_val = 'annotation'
        elif(keyArr[1] == 'Описанию'):
            order_val = 'description'
        elif(keyArr[1] == 'Автору'):
            order_val = 'author_id'
        elif(keyArr[1] == 'Году издания'):
            order_val = 'publish_info_id'
        
        if(keyArr[2] == 'убыванию'):
            order_val = '-' + order_val

        print(order_val)

        if(keyArr[0] == 'all'):
            queryset = InfoSource.objects.all().order_by(order_val)
        else:
            queryset = InfoSource.objects.filter(annotation__icontains = keyword).order_by(order_val)
        sourcesArray = []

        for el in queryset:
            tempObj = {}
            tempObj['id'] = el.id
            tempObj['annotation'] = el.annotation
            tempObj['description'] = el.description
            tempObj['link_url'] = el.link_url
            tempObj['admin'] = el.admin.username if el.admin != None else None
            tempObj['author'] = {   "id": el.author.id,
                                    "name": el.author.name,
                                    "surname": el.author.surname,
                                    "patronomyc": el.author.patronomyc,
                                } if el.author != None else None
            tempObj['domain'] = {
                                    "id": el.domain.id,
                                    "name": el.domain.name,
                                    "url": el.domain.url,
                                } if el.domain != None else None
            tempObj['category'] = {
                                    "id": el.category.id,
                                    "name": el.category.name,
                                } if el.category != None else None
            tempObj['publish_info'] = {
                                        "id": el.publish_info.id,
                                        "publish_place": el.publish_info.publish_place,
                                        "publish_year": el.publish_info.publish_year
                                      } if el.publish_info != None else None

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
    