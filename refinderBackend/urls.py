from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/', include('api.urls')),
    path('token-auth/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
]