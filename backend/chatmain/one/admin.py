from django.contrib import admin
# Register your models here.
#from django_summernote.admin import SummernoteModelAdmin
from .models import blogpost

# Apply summernote to all TextField in model.
"""class blogpostAdmin:
	  # instead of ModelAdmin
	exclude = ('slug',)
	list_display = ('id', 'title', 'category', 'date_created')
	list_display_links = ('id', 'title')
	search_fields = ('title',)
	list_per_page = 25"""
	


admin.site.register(blogpost)
