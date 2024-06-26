# Generated by Django 4.2.4 on 2024-03-27 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trades', '0006_rename_trading_listing_collectible'),
        ('profiles', '0005_alter_profile_profile_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='collection',
            field=models.ManyToManyField(blank=True, default=None, related_name='collection', to='trades.listing'),
        ),
    ]
