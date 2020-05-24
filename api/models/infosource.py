from django.db import models
from django.contrib.auth.models import User
from .author import Author
from .domain import Domain
from .category import Category
from .publish_info import PublishInfo

class InfoSource(models.Model):
    annotation = models.CharField(max_length=255)
    language_context = models.CharField(max_length=40)
    description = models.CharField(max_length=255)
    link_url = models.CharField(max_length=255)
    admin = models.ForeignKey(to=User, on_delete=models.CASCADE)
    author = models.ForeignKey(to=Author, on_delete=models.CASCADE)
    domain = models.ForeignKey(to=Domain, on_delete=models.CASCADE)
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    publish_info = models.ForeignKey(to=PublishInfo, on_delete=models.CASCADE)