from django.contrib import admin
from .models.author import Author
from .models.category import Category
from .models.domain import Domain
from .models.infosource import InfoSource
from .models.publish_info import PublishInfo

admin.site.register(Author)  # admin.site.register, а не admin.register!
admin.site.register(Category)
admin.site.register(Domain)
admin.site.register(InfoSource)
admin.site.register(PublishInfo)