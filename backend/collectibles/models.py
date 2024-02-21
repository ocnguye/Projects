from django.db import models

# Create your models here.
class Collectible(models.Model):
    product = models.CharField(max_length=100, default='')
    series = models.CharField(max_length=100, default='')
    name = models.CharField(max_length=100)
    image = models.TextField(default="")

    def __str__(self):
        return self.name
