# Generated by Django 3.0.8 on 2020-10-31 14:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0047_auto_20201031_1938'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='cart',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='product.Cart'),
        ),
    ]
