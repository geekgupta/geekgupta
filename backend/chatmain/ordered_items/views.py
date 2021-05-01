
from django.shortcuts import render, HttpResponse
from product.models import product
from django.contrib.auth.decorators import login_required
from cart.cart import Cart
from django.http import JsonResponse
from .serializer import *
import json
from rest_framework import response
from rest_framework import permissions,generics
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView,UpdateAPIView
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response

#@login_required(login_url="/users/login")
def cart_add(request, id):
    cart = Cart(request)
    prod = product.objects.get(id=id)
    cart.add(product=prod)
    return HttpResponse("home")


#@login_required(login_url="/users/login")
def item_clear(request, id):
    cart = Cart(request)
    prod = product.objects.get(id=id)
    cart.remove(prod)
    return HttpResponse("cart_detail")


#@login_required(login_url="/users/login")
def item_increment(request, id):
    cart = Cart(request)
    prod = product.objects.get(id=id)
    cart.add(product=prod)
    return HttpResponse("cart_detail")


#@login_required(login_url="/users/login")
def item_decrement(request, id):
    cart = Cart(request)
    prod = product.objects.get(id=id)
    cart.decrement(product=prod)
    return HttpResponse("cart_detail")


#@login_required(login_url="/users/login")
def cart_clear(request):
    cart = Cart(request)
    cart.clear()
    return HttpResponse("cart_detail")

@api_view(('GET',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
#@login_required(login_url="/users/login")
def cart_detail(request):
    cart = Cart(request)
    request.COOKIES['data'] = cart
    #x = json.dumps(cart.detail())
    #obj = Geeks(x)
    serializer = GeeksSerializer(data=cart.detail())
    if serializer.is_valid():
              serializer.save()
    return Response(serializer.data)
    #return JsonResponse(cart.detail(), safe=False)

class cart_class(ListAPIView):
    serializer_class = GeeksSerializer
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        cart = Cart(request)
        x = json.dumps(cart.detail())
        obj = Geeks(cart.detail())
        serializer = GeeksSerializer(obj)
        return Response(serializer.data)
        


