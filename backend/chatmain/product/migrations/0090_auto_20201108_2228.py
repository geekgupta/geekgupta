# Generated by Django 3.0.8 on 2020-11-08 16:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0089_auto_20201108_2220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='cart',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='product.Cart'),
        ),
    ]
