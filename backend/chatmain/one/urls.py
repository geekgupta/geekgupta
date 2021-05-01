from django.contrib import admin
from django.urls import path,include
from . import views ;
from django.views.generic import TemplateView
from rest_framework.urlpatterns import format_suffix_patterns 
from .views import BlogpostDetailView,blogpost,BlogpostFeaturedView,BlogpostListView,categoryview  
urlpatterns = [
    path('featured', BlogpostFeaturedView.as_view(), name="featured"),
    path('category',categoryview.as_view(),name = "category"),
    path('', BlogpostListView.as_view(), name="start"),
    path('<slug>', BlogpostDetailView.as_view(), name="detail"),
    
   
]
 
urlpatterns = format_suffix_patterns(urlpatterns)
