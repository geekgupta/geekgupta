# Generated by Django 3.0.8 on 2020-11-08 15:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0072_auto_20201108_2034'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='total',
            field=models.FloatField(default=0.0, null=True),
        ),
        migrations.AlterField(
            model_name='cartitem',
            name='cart',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='product.Cart'),
        ),
    ]
