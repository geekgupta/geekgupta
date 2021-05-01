from django.contrib import admin

# Register your models here.
from .models import profile

class ProfileAdmin(admin.ModelAdmin):
	list_display = ['user_id','username', 'first_name', 'last_name','email','password','avatar','date_of_birth', 'date_created']

admin.site.register(profile,ProfileAdmin)