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
from rank_bm25 import BM25Okapi
import operator

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

    def getRank(self, myquery, annotation):
        corpus = ["",annotation,""]

        tokenized_corpus = [doc.split(" ") for doc in corpus]
        bm25 = BM25Okapi(tokenized_corpus)

        query = myquery
        tokenized_query = query.split(" ")

        doc_scores = bm25.get_scores(tokenized_query)

        return doc_scores[1]

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
        elif(keyArr[1] == 'Релевантности'):
            order_val = 'annotation'
        
        if(keyArr[2] == 'убыванию'):
            order_val = '-' + order_val

        print(order_val)

        if(keyArr[0] == 'all'):
            queryset = InfoSource.objects.all().order_by(order_val)
        else:
            queryset = InfoSource.objects.filter(annotation__icontains = keyArr[0]).order_by(order_val)
        sourcesArray = []

        for el in queryset:
            tempObj = {}
            tempObj['id'] = el.id
            tempObj['annotation'] = el.annotation
            tempObj['rank_annotation'] = self.getRank(keyArr[0], el.annotation)
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

        if(keyArr[1] == 'Релевантности'):
            #sorted(sourcesArray, key=lambda k: k['rank_annotation'])
            #sourcesArray.sort(key='rank_annotation', reverse=False)
            sourcesArray.sort(key=operator.itemgetter('rank_annotation'))

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
    