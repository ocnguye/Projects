from django.db import models

# Create your models here.
class Collectible(models.Model):
    series = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
