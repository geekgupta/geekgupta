from django.contrib import admin
from django.urls import path,include
from . import views 
from django.views.generic import TemplateView
from rest_framework.urlpatterns import format_suffix_patterns 
from .views import productDetailView , productFeaturedView ,  productListView,categoryview ,CartViewSet ,SearchApi,CartDecrement,CartIncrement,Cart_add_items,Cart_delete_items,Order,productlist,productOfferView

urlpatterns = [
    path('featured', productFeaturedView.as_view(), name="featured"),
    path('offer', productOfferView.as_view(), name="offer"),
    path('category',categoryview.as_view(),name = "category"),
    path('', productListView.as_view(), name="start"),
    path('<slug>', productDetailView.as_view(), name="detail"),
    path('items/cart',CartViewSet.as_view(), name='cart'),
    path('items/cart/increment',CartIncrement.as_view(), name='cart'),
    path('items/cart/decrement',CartDecrement.as_view(), name='cart'),
    path('items/cart/add',Cart_add_items.as_view(), name='cart'),
    path('items/cart/delete',Cart_delete_items.as_view(), name='cart'),
    path('api/query',SearchApi.as_view() , name = 'search'),
    path('place/order',Order.as_view() , name = 'search'),
    path('list/product',productlist.as_view() , name = 'search')
    
   
]
 
urlpatterns = format_suffix_patterns(urlpatterns)
