# Generated by Django 3.0.8 on 2020-09-05 21:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Products',
            new_name='product',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='desciption',
            new_name='description',
        ),
    ]
