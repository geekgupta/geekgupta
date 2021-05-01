from django.urls import path
from . import views
from .views import cart_clear,cart_add,cart_detail,item_clear,item_decrement,item_increment,cart_class
urlpatterns = [
    path('cart/add/<int:id>/', views.cart_add, name='cart_add'),
    path('cart/item_clear/<int:id>/', views.item_clear, name='item_clear'),
    path('cart/item_increment/<int:id>/',
         views.item_increment, name='item_increment'),
    path('cart/item_decrement/<int:id>/',
         views.item_decrement, name='item_decrement'),
    #path('cart/cart_clear/', views.cart_clear, name='cart_clear'),
     path('cart/cart_class/', cart_class.as_view() , name='cart_clear'),
    path('cart/cart-detail/',views.cart_detail,name='cart_detail'),
]