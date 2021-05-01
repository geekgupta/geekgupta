from rest_framework import serializers
from .models import profile 

# User Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = profile
        fields = ('id', 'username', 'email')

# Register Serializer
class ProfileRegister(serializers.ModelSerializer):
    class Meta:
        model = profile
        fields = ('id','first_name', 'last_name','email', 'password','contact_no','avatar','date_of_birth')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = profile.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user