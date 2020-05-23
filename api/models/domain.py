from django.db import models

class Domain(models.Model):
    name = models.CharField(max_length=40)
    url = models.CharField(max_length=255)