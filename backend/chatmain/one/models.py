from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

class categories(models.TextChoices):
    WORLD = 'world'
    POLITICLE = 'politicle'
    ENVIRONMENT = 'environment'
    TECHNOLOGY = 'technology'
    CULTURE = 'culture'
    DESIGN = 'design'
    COMPUTER_SCIENCE = 'computer_science'
    SCIENCE = "science"
    TRAVEL = "travel"
    HEALTH = "health"
    STYLE = "style"
    OPINION = "opinion"


class blogpost(models.Model):
     title  = models.CharField(max_length =50)
     slug  = models.SlugField()
     category = models.CharField(max_length=50 ,choices=categories.choices, default=categories.WORLD)
     thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d')
     excerpt = models.CharField(max_length=150)
     month = models.CharField(max_length=3)
     day = models.CharField(max_length=2)
     content = models.TextField()
     featured = models.BooleanField(default=False)
     date_created = models.DateTimeField(default=datetime.now, blank=True)

     def save(self, *args, **kwargs):
         original_slug = slugify(self.title)
         queryset = blogpost.objects.all().filter(slug__iexact = original_slug).count()
         count = 1
         slug = original_slug
         while (queryset):
             slug = original_slug + '-' + str(count)
             count += 1
             queryset = blogpost.objects.all().filter(slug__iexact = original_slug).count()
         
         self.slug = slug

         if self.featured:
             try:
                 temp = blogpost.objects.get(featured=True)
                 if self != temp:
                     temp.featured = False
                     temp.save()
             except blogpost.DoesNotExist:
                 pass
                     
         super(blogpost, self).save(*args, **kwargs)
         
         def __str__(self):
             return self.title
         



     
     

