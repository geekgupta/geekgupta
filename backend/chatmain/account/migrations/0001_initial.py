# Generated by Django 3.0.8 on 2020-09-13 11:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(blank=True, editable=False, max_length=6, null=True, unique=True)),
                ('username', models.CharField(blank=True, editable=False, max_length=254, null=True, unique=True)),
                ('first_name', models.CharField(max_length=25)),
                ('last_name', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=8)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('contact_no', models.IntegerField()),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='profile_photo/%Y/%m/%d')),
                ('date_created', models.DateTimeField(blank=True, default=datetime.datetime.now)),
            ],
        ),
    ]
