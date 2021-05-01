from django.db import models
from datetime import datetime
import uuid 
class profile(models.Model):
	user_id = models.CharField(max_length=6, null=True, blank=True, unique=True ,editable = False)
	username = models.CharField(max_length=254,unique=True,null=True, blank=True ,editable = False)
	first_name = models.CharField(max_length=25)
	last_name = models.CharField(max_length=20)
	password = models.CharField(max_length=8)
	email = models.EmailField(max_length=254,unique = True)
	contact_no = models.IntegerField()
	date_of_birth = models.DateField(auto_now=False, null= True , blank = True)
	avatar = models.ImageField(upload_to='profile_photo/%Y/%m/%d', null=True, blank=True)
	date_created = models.DateTimeField(default=datetime.now, blank=True)
	
	def save(self):
		self.user_id = str(uuid.uuid4())
		self.username = self.email
		super(profile, self).save()

	def __unicode__(self):
		return unicode(self.user_id,self.username,self.password)
		
	
	