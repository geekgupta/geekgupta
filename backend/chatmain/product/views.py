from django.shortcuts import render
from django.shortcuts import render,HttpResponse
from rest_framework import response
from rest_framework.decorators import api_view ,renderer_classes
from rest_framework.response import Response 
from rest_framework.renderers import JSONRenderer ,TemplateHTMLRenderer
from .serieliazer import productserializer,cartserializer,CartSerializer,OrderSerializer,TransactionSerializer,ProductListSerializer
from rest_framework import permissions,generics,mixins
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter , OrderingFilter 
from rest_framework.generics import ListAPIView, RetrieveAPIView,UpdateAPIView
from .models import product,Cart,CartItem ,order , transaction
import django.shortcuts
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum
from accounts.models import UserAccount
from datetime import datetime


# Create your views here.
class productListView(ListAPIView):
    queryset = product.objects.order_by('-date_created')
    serializer_class = productserializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)
    
class productDetailView(RetrieveAPIView):
    queryset = product.objects.order_by('-date_created')
    serializer_class = productserializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)
    
class productFeaturedView(ListAPIView):
    queryset = product.objects.all().filter(featured = True)
    serializer_class = productserializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)

class productOfferView(ListAPIView):
    queryset = product.objects.all().filter(offer = True)
    serializer_class = productserializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)


class categoryview(APIView):
    serializer_class = productserializer
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, format=None):
        data = self.request.data 
        print(request.data)
        category = data['category']
        queryset = product.objects.order_by('-date_created').filter(category__iexact=category)
        serializer = productserializer(queryset, many=True)

        return Response(serializer.data)
        

class SearchApi(ListAPIView):
    queryset = product.objects.all()
    serializer_class = productserializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('product_name' , 'description','price','category')
    

    

class CartViewSet(APIView):
    serializer_class = CartSerializer
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = self.request.data 
        user_identification_no = data['id']
        cart_id = 0 
        cart_query = Cart.objects.filter(user_id = user_identification_no)
        for m in cart_query :
            cart_id = m.id 
        queryset = CartItem.objects.filter(cart_id = cart_id)
        serializer = CartSerializer(queryset, many=True)
        return Response(serializer.data)
        
    def get(self, request,format=None):
        data = self.request.data 
        user_identification_no = data['id']
        cart_query = Cart.objects.filter(user_id = user_identification_no)
        query = Cart.objects.get(user_id = user_identification_no)
        query.save()
        serializer = cartserializer(cart_query, many=True)
        return Response(serializer.data)


class Order(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = self.request.data 
        product_id = data['products']
        user_identification_no = data['id']
        identify = data['check']
        now = datetime.now() 
        if identify == "cart" :
            for i in product_id : 
                l = order(product = product.objects.get(id = i["product"].get('id')),status = 'pending' , user= UserAccount.objects.get(id = user_identification_no),total = i["price_ht"], quantity = i["quantity"] )
                l.save()
        if identify == "product" :
            for i in product_id :
                l = order(product = product.objects.get(id = i["product_id"]),status = 'pending' , user= UserAccount.objects.get(id = user_identification_no),total = i["price_ht"], quantity = i["quantity"] )
                l.save()

        return HttpResponse("done")  

    def get(self, request,format=None):
        """data = self.request.data 
        user_identification_no = data['id']
        Order_query = order.objects.filter(user_id = user_identification_no)
        serializer = OrderSerializer(Order_query, many=True)
        return Response(serializer.data)"""
        t = request.COOKIES.get('ordered_product')
        print(t)
        for i in t : 
            print(i)
        return HttpResponse(t) 


class productlist(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        data = self.request.data 
        product_id = data['list']
        Order_query = product.objects.filter(id__in = product_id)
        serializer = ProductListSerializer(Order_query, many=True)
        #serializer.data['qauntity'] = 3 
        return Response(serializer.data)





class CartIncrement(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = self.request.data 
        cart_id = data['value']
        l = CartItem.objects.get(id = cart_id)
        pro = product.objects.get(id = l.product.id)
        if pro.stoke <= 1 :
            pro.stoke = 1 
            pro.save()
        else :
            pro.stoke = pro.stoke-1
            print(pro.stoke)
            pro.save()
            l.quantity = l.quantity+1
            l.save()  
        return HttpResponse("done")

class CartDecrement(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = self.request.data 
        cart_id = data['value']
        l = CartItem.objects.get(id = cart_id)
        pro = product.objects.get(id = l.product.id)
        if l.quantity <= 1 :
            l.delete()
        else :
            l.quantity = l.quantity-1
            l.save() 
            pro.stoke = pro.stoke+1
            print(pro.stoke)
            pro.save()
        return HttpResponse("done")    


class Cart_add_items(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = self.request.data 
        product_id = data['product_id']
        user_identification_no = data['id']
        cart_id = 0 
        cart_query = Cart.objects.filter(user_id = user_identification_no)
        for i in cart_query :
            cart_id = i.id 
        queryset = CartItem.objects.filter(cart_id = cart_id)
        con = False
        for m in queryset :
            if int(product_id) == m.product.id :
                crtm = m.id
                con = True
                break

        if con == True    :
            l = CartItem.objects.get(id = crtm)
            l.quantity = l.quantity+1
            l.save()
            con = False 
        else : 
            l = CartItem(product = product.objects.get(id = product_id),cart= Cart.objects.get(id = cart_id))
            l.save() 
        return HttpResponse("done")    

class Cart_delete_items(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = self.request.data 
        cart_id = data['value']
        l = CartItem.objects.get(id = cart_id)
        l.delete()
        return HttpResponse("delete")    



#------comment part ------------------#

"""class CartViewSet(APIView):

    serializer_class = CartSerializer
    permission_classes = (permissions.AllowAny,)
   
    def get(self, request, format=None):
        #data = self.request.data 
        #d = data['user']
        queryset = Cart.objects.filter(user=2)
        serializer = CartSerializer(queryset)
        return Response(serializer.data)"""

"""class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer

    def get_queryset(self,request):
        return Cart.objects.filter(user=self.request.user)

    def add(self, request, pk):
        '''
            create product and add it to the cart represented by pk
        '''
        return Response({"success":True})

    def pre_save(self, obj):
        obj.user = self.request.user"""
"""class CartViewSet(APIView):
    serializer_class = CartSerializer
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
       
       # k = Carttable.items.add(product(id = 6)).filter(user = 1)
        k = Carttable.objects.filter(id = 1) 
        
        
        for i in k :
            a = i.items.all()
            for k in a:
                print(k.price)

        #queryset = product.objects.filter(id__in = [1,2])
        #serializer = productserializer(queryset, many=True)
        serializer = CartSerializer(k, many=True)
        cart_id = 0 
        q = Cart.objects.filter(user_id = 1)
        for m in q :
            cart_id = m.id 

        p = CartItem.objects.filter(cart_id = )
        for i in p :
           a = i.product
           print(a.price)

        serializer = CartSerializer(p, many=True)
        return  Response(serializer.data)
        
class cartListView(ListAPIView) :
    q = Cart.objects.raw('SELECT id FROM product_cart WHERE user_id  = %s', '1' )[0]
    #p = CartItem.objects.get(cart_id = q.id)
   
   # queryset = product.objects.all().filter(id = (i))
    l =  ("1","2")
    queryset = product.objects.raw('SELECT * FROM product_product WHERE id IN  %s',l)
    serializer_class = productserializer
    permission_classes = (permissions.AllowAny,)"""
