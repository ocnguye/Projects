from rest_framework import serializers
from .models import Profile
from collectibles.serializers import CollectibleSerializer

class ProfileSerializer(serializers.ModelSerializer):
    wishlist = CollectibleSerializer(many=True, read_only=True)
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.username
    
    class Meta:
        model = Profile
        fields = ['bio', 'collection', 'wishlist', 'trades', 'rating', 'raters', 'username', 'profile_img', 'id', 'favorites', 'user', 'saved']