# Generated by Django 4.1.3 on 2023-04-06 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('NeedABedAPI', '0009_location_bed_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='capacity',
            field=models.IntegerField(default=50),
        ),
    ]