from django.db import models

class Trade(models.Model):
    trading = models.ForeignKey('collectibles.Collectible', on_delete=models.CASCADE, related_name="trading")
    requesting1 = models.ForeignKey('collectibles.Collectible', on_delete=models.CASCADE, related_name="requesting1", null=True, blank=True)
    requesting2 = models.ForeignKey('collectibles.Collectible', on_delete=models.CASCADE, related_name="requesting2", null=True, blank=True)
    requesting3 = models.ForeignKey('collectibles.Collectible', on_delete=models.CASCADE, related_name="requesting3", null=True, blank=True)
    price = models.DecimalField(decimal_places=2, default=0.00, max_digits=10, blank=True, null=True)
    description = models.TextField(default="", blank=True, null=True)
    images = models.TextField(default="", blank=True, null=True)
    verified = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.trading.name

class Image(models.Model):
    url = models.CharField(max_length=255, default="", blank=True)
    verified = models.BooleanField(default=False, blank=True)
