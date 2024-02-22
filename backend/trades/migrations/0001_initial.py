# Generated by Django 4.2.4 on 2024-02-21 08:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('collectibles', '0003_alter_collectible_product_alter_collectible_series'),
    ]

    operations = [
        migrations.CreateModel(
            name='Trade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('description', models.TextField(default='')),
                ('image', models.TextField(default='')),
                ('requesting1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requesting1', to='collectibles.collectible')),
                ('requesting2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requesting2', to='collectibles.collectible')),
                ('requesting3', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requesting3', to='collectibles.collectible')),
                ('trading', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trading', to='collectibles.collectible')),
            ],
        ),
    ]
