
from django.contrib import admin
from django.urls import path,include 
from . import urls 
from django.views.generic import TemplateView 
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('admin/', admin.site.urls),
    path('blog/', include('one.urls')),
    path('orders/',include('ordered_items.urls')),
    path('account/',include('account.urls')),
    path('product/',include('product.urls')),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
