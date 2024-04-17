from django.contrib import admin

# Register your models here.
from .models import Trade, Listing
admin.site.register(Trade)
admin.site.register(Listing)