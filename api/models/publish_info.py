from django.db import models

class PublishInfo(models.Model):
    publish_place = models.CharField(max_length=255)
    publish_year = models.CharField(max_length=10)