from rest_framework import serializers
from .models import product,Cart,CartItem,order,transaction

class productserializer(serializers.ModelSerializer):
    #data = dataserializer(read_only = True , source = 'room_set' , many = True)
    class Meta :
        model = product
        fields = '__all__'
        Lookup_field = 'slug'
        

class cartserializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'



class ProductListSerializer(serializers.ModelSerializer): 
    class Meta:
        model = product
        fields = ['id', 'product_name','category','price','quantity']





class CartSerializer(serializers.ModelSerializer):
    product = productserializer()
    class Meta:
        model = CartItem
        fields = '__all__'





class OrderSerializer(serializers.ModelSerializer):
    product = productserializer()
    class Meta:
        model = order
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = transaction
        fields = '__all__'

