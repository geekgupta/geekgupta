from django.contrib import admin

from.models import product,Cart,CartItem,productdetail,order,transaction
# Register your models here.

class ProductAdmin(admin.ModelAdmin):
	list_display = ['id', 'product_name', 'category','price','description',  'date_created']

class cartAdmin(admin.ModelAdmin):
	list_display = ['id','date_created' ,'status','user']

class product_detail(admin.ModelAdmin):
	list_display = ['id', 'product', 'sizes' ,"quantity"]


class cartitemAdmin(admin.ModelAdmin):
	list_display = ['id', 'product', 'quantity','price_ht','cart']

	 
admin.site.register(product, ProductAdmin)
admin.site.register(Cart)
admin.site.register(order,cartAdmin )
admin.site.register(transaction,cartAdmin)
#admin.site.register(Carttable , cartAdmin)
admin.site.register(CartItem, cartitemAdmin)
admin.site.register(productdetail,product_detail)
