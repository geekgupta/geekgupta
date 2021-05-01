from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify
from accounts.models import UserAccount
from django.db.models import Sum
# Create your models here.

class categories(models.TextChoices):
    AllPRODUCT = 'allproduct'
    SHIRTS = 'shirts'
    HODDIES = 'hoodies'
    JEANS = 'jeans'
    SHOTS = 'shots'
    TROUSERS = 'trousers'
    JACKET = "jacket"
    TSHIRTS = "tshirts"
    PANT = "PANT"
    UNDERWEAR = "underwear"
    DENIM = "denim"


class product(models.Model):
     product_name  = models.CharField(max_length =50)
     slug  = models.SlugField()
     category = models.CharField(max_length=50 ,choices=categories.choices, default=categories.AllPRODUCT)
     thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d')
     original_price = models.IntegerField(default=150) 
     price = models.IntegerField(default=0)
     discount =  models.FloatField(blank=True,default=0,max_length=3)
     description = models.TextField()
     featured = models.BooleanField(default=False)
     offer = models.BooleanField(default=False)
     stoke = models.IntegerField(default=1)
     is_active = models.BooleanField(default=True)
     date_created = models.DateTimeField(default=datetime.now, blank=True)

     def save(self, *args, **kwargs):
         self.discount = 100-((self.price/self.original_price)*100)
         original_slug = slugify(self.product_name)
         queryset = product.objects.all().filter(slug__iexact = original_slug).count()
         count = 1
         slug = original_slug
         while (queryset):
             slug = original_slug + '-' + str(count)
             count += 1
             queryset = product.objects.all().filter(slug__iexact = original_slug).count()
             break
         
         self.slug = slug

         if self.featured:
             try:
                 temp = product.objects.get(featured=True)
                 if self != temp:
                     temp.featured = False
                     temp.save()
             except product.DoesNotExist:
                 pass
                     
         super(product, self).save(*args, **kwargs)
         
         def __str__(self):
             return self.product_name
         def __unicode__(self):
             return self.product_name

         def get_full_name(self):
             return self.product_name
    
         def get_short_name(self):
             return self.product_name


class productdetail(models.Model):
    product = models.ForeignKey(product, on_delete=models.CASCADE)
    sizes = models.CharField(max_length=50 ,choices= (("s" , "small"),("m" , "medium"), ("l","large"), ("xl","xcel")),  default="s")
    quantity = models.IntegerField(default=1)

    




class Cart(models.Model):
    user = models.OneToOneField(UserAccount , on_delete=models.CASCADE,default = ''  )
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    total = models.FloatField(default=0,null=True)
    def save(self, *args, **kwargs):
        queryset = CartItem.objects.filter(cart=self.id).aggregate(Sum('price_ht'))
        self.total = queryset["price_ht__sum"]
        super(Cart, self).save(*args, **kwargs)

class CartItem(models.Model):
    product = models.ForeignKey(product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price_ht = models.FloatField(blank=True,default=0)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, default='')
    TAX_AMOUNT = 19.25

    def save(self, *args, **kwargs):
        self.price_ht = self.product.price * self.quantity
        super(CartItem, self).save(*args, **kwargs)
     
    def price_ttc(self):
        return self.price_ht * (1 + TAX_AMOUNT/100.0)

class status(models.TextChoices):
    SUCCESS = 'success'
    PENDING = 'pending'
    FAIL = 'fail'

 
class order(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255, blank=True, null=True,choices=status.choices)
    user = models.ForeignKey(UserAccount , on_delete=models.CASCADE,default = ''  )
    product = models.ForeignKey(product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    total = models.FloatField(null=True)


class transaction(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255, blank=True, null=True,choices=status.choices)
    user = models.OneToOneField(UserAccount , on_delete=models.CASCADE,default = ''  )
    order = models.ForeignKey(order, on_delete=models.CASCADE)



