# import serializer from rest_framework 
from rest_framework import serializers 

class Geeks(object): 
	def __init__(self,json_data): 
		self.json_data = json_data

# create a serializer 
class GeeksSerializer(serializers.Serializer): 
	# intialize fields
	json_data = serializers.DictField(child = serializers.CharField())
	