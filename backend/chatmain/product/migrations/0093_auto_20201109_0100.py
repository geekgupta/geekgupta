# Generated by Django 3.0.8 on 2020-11-08 19:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0092_auto_20201109_0050'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='discount',
            field=models.FloatField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='original_price',
            field=models.IntegerField(default=150),
        ),
        migrations.AlterField(
            model_name='cartitem',
            name='cart',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='product.Cart'),
        ),
    ]