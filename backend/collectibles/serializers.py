from rest_framework import serializers
from .models import Collectible
from profiles.models import Profile

class CollectibleSerializer(serializers.ModelSerializer):
    owned = serializers.SerializerMethodField()
    wishlisted = serializers.SerializerMethodField()

    def get_owned(self, obj) -> bool:
        request = self.context.get('request')
        if not request: return False
        profile = Profile.objects.get(user=request.user)
        collectibles = [listing.collectible.id for listing in profile.collection.all()]
        return obj.id in collectibles

    def get_wishlisted(self, obj) -> bool:
        request = self.context.get('request')
        if not request: return False
        profile = Profile.objects.get(user=request.user)
        wishlist = [collectible.id for collectible in profile.wishlist.all()]
        return obj.id in wishlist
        
    class Meta:
        model = Collectible
        fields = ['product', 'series', 'name', 'image', 'id', 'owned', 'wishlisted']