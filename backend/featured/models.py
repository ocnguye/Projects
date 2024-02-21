from django.db import models

# Create your models here.
class Featured(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(default="")
    link = models.TextField(default="")
    address = models.TextField(default="")
    image = models.TextField(default="")

    def __str__(self):
        return self.name
