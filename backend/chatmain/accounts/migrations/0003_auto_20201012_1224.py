# Generated by Django 3.0.8 on 2020-10-12 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_useraccount_user_cart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='user_cart',
            field=models.IntegerField(),
        ),
    ]
