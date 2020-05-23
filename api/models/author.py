from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=40)
    surname = models.CharField(max_length=40)
    patronomyc = models.CharField(max_length=40)
    email = models.CharField(max_length=40)