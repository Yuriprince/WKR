from django.urls import path
from django.conf.urls import url
from .views.infosource_view import InfoSourceViewSet, MyOwnView
from .views.admin_view import AdminViewSet
from .views.category_view import CategoryViewSet
from .views.domain_view import DomainViewSet
from .views.publish_view import PublishInfoViewSet
from .views.author_view import AuthorViewSet

from rest_framework_simplejwt import views as jwt_views
from rest_framework_nested import routers

api_routers = routers.SimpleRouter()
api_routers.register(r'sources', InfoSourceViewSet, basename='sources')
api_routers.register(r'admins', AdminViewSet, basename='admins')
api_routers.register(r'categories', CategoryViewSet, basename='sources')
api_routers.register(r'domains', DomainViewSet, basename='admins')
api_routers.register(r'publishes', PublishInfoViewSet, basename='sources')
api_routers.register(r'authors', AuthorViewSet, basename='admins')


urlpatterns = api_routers.urls + [
    path('sourcesfull/<keyword>/', MyOwnView.as_view(), name='sources'),
    path('refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
