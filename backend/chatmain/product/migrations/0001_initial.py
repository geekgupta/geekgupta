# Generated by Django 3.0.8 on 2020-09-05 19:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=50)),
                ('slug', models.SlugField()),
                ('category', models.CharField(choices=[('allproduct', 'Allproduct'), ('shirts', 'Shirts'), ('hoodies', 'Hoddies'), ('jeans', 'Jeans'), ('shots', 'Shots'), ('trousers', 'Trousers'), ('jacket', 'Jacket'), ('tshirts', 'Tshirts'), ('PANT', 'Pant'), ('underwear', 'Underwear'), ('denim', 'Denim')], default='allproduct', max_length=50)),
                ('thumbnail', models.ImageField(upload_to='photos/%Y/%m/%d')),
                ('price', models.IntegerField(default=150)),
                ('desciption', models.TextField()),
                ('featured', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(blank=True, default=datetime.datetime.now)),
            ],
        ),
    ]
