# Generated by Django 5.0.6 on 2024-06-04 15:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='representational_image',
        ),
    ]