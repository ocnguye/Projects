from rest_framework import serializers
from .models import Collectible
from profiles.models import Profile

class CollectibleSerializer(serializers.ModelSerializer):
    owned = serializers.SerializerMethodField()
    wishlisted = serializers.SerializerMethodField()

    def get_owned(self, obj) -> bool:
        request = self.context.get('request')
        if not request: return False
        urlId = request.query_params.get('id')
        profile = Profile.objects.get(user__username=urlId)
        collectibles = [listing.collectible.id for listing in profile.collection.all()]
        collection = [collectible.id for collectible in profile.in_collection.all()]
        is_owned = obj.id in collectibles or obj.id in collection
        return is_owned

    def get_wishlisted(self, obj) -> bool:
        request = self.context.get('request')
        if not request: return False
        urlId = request.query_params.get('id')
        profile = Profile.objects.get(user__username=urlId)
        wishlist = [collectible.id for collectible in profile.wishlist.all()]
        return obj.id in wishlist
        
    class Meta:
        model = Collectible
        fields = ['product', 'series', 'name', 'image', 'id', 'owned', 'wishlisted', 'in_collection']