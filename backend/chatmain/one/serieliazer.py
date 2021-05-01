from rest_framework import serializers
from .models import blogpost

class userserializer(serializers.ModelSerializer):
    class Meta :
        model = blogpost
        fields = '__all__'
        Lookup_field = 'slug'
        