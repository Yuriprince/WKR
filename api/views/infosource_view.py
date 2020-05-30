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
            return url[:end] + '.ru' + str(el)
        else:
            return url

    def parse_page(self, url, selector):
        r = requests.get(url)
        html = BS(r.content, 'html.parser')

        src_list = []
        dictionary = {}
        counter = 0

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
                src_list.append({'title': annotation, 'url': self.isnt_archive_link(url, el.attrs['href'])})

            else:
                for subel in el.contents:
                    if type(subel) != NavigableString:
                        if subel.name == 'a':
                            caret = el.text.find('\n')
                            if caret != -1:
                                annotation = el.text[:caret].strip()
                            else:
                                annotation = el.text.strip()
                                src_list.append({'title': annotation, 'url': self.isnt_archive_link(url, subel.attrs['href'])})
            counter +=1
        return src_list
                    
    def get(self, request, url_and_selector):
        url_my1 = 'https://cyberleninka.ru/article/c/computer-and-information-sciences_|_.list li a'
        url_my2 = 'https://tvoireferaty.ru/informatika_|_.doc_ico > a'

        #shifrstr = 'cyberleninka.ru@article@c@computer-and-information-sciences_|_.list li a'
        #www.ukazka.ru@catalog-nauchnye-trudy-stati-otchety-lektcii-13098.html_|_.cat_one_prod h2 > a'
        old_str = "https://{}".format(url_and_selector.replace('@', '/'))

        my_list = old_str.split('_|_')
        new_list = self.parse_page(my_list[0], my_list[1])
        return Response(new_list)

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
    