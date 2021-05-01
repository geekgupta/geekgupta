from django.shortcuts import render,HttpResponse
from rest_framework import response
from rest_framework.decorators import api_view ,renderer_classes
from rest_framework.response import Response 
from rest_framework.renderers import JSONRenderer ,TemplateHTMLRenderer
from .serieliazer import userserializer
from rest_framework import permissions,generics,mixins
from rest_framework.views import APIView


from rest_framework.generics import ListAPIView, RetrieveAPIView,UpdateAPIView
from .models import blogpost

from django.views.decorators.csrf  import csrf_exempt 

# Create your views here.
class BlogpostListView(ListAPIView):
    queryset = blogpost.objects.order_by('-date_created')
    serializer_class = userserializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)
    
class BlogpostDetailView(RetrieveAPIView):
    queryset = blogpost.objects.order_by('-date_created')
    serializer_class = userserializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)
    
class BlogpostFeaturedView(ListAPIView):
    queryset = blogpost.objects.all().filter(featured = True)
    serializer_class = userserializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)
   
class categoryview(APIView):
    serializer_class = userserializer
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, format=None):
        data = self.request.data 
        print(request.data)
        category = data['category']
        queryset = blogpost.objects.order_by('-date_created').filter(category__iexact=category)
        serializer = userserializer(queryset, many=True)

        return Response(serializer.data)
        


