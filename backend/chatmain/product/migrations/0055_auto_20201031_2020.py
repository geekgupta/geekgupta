# Generated by Django 3.0.8 on 2020-10-31 14:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0054_auto_20201031_2018'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='cart',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='product.Cart'),
        ),
    ]
