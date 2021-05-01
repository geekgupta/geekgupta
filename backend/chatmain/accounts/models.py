from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import product.models
from datetime import datetime

class UserAccountManager(BaseUserManager):
    def create_user(self, email,name, password=None,**kwargs):
        now = datetime.now()
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email , name= name)
        user.last_login = now 
        user.set_password(password)
        user.save()
        return user

    def create_staffuser(self, email, password,**kwargs):
        """
        Creates and saves a staff user with the given email and password.
        """
        now = timezone.now()
        user = self.create_user(
            email,
            password=password,
            **kwargs
        )
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password,**kwargs):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            **kwargs
        )
        user.is_superuser = True 
        #user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False) # a admin user; non super-user
    is_admin = models.BooleanField(default=False) # a superuser
    objects = UserAccountManager()
    #user_cart = models.IntegerField()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    """def save(self, *args, **kwargs):
        from product.models import Cart
        cart = Cart.objects.filter(user = UserAccount.objects.get(id = self.id))
        check = False 
        for j in cart  :
            if self.id == j.user.id :
                check = True 

        if check == True :
            for j in cart :
                self.user_cart = j.id
            check = False 

        else :
            cart_no  = Cart(user = UserAccount.objects.get(id = self.id))
            cart_no.save()
            for m in cart :
                self.user_cart = m.id


           
             
            
        super(UserAccount, self).save(*args, **kwargs)"""
