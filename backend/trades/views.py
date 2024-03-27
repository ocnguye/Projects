from rest_framework import serializers
from trades.models import Trade, Image
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from profiles.models import Profile
from collectibles.views import CollectibleSerializer
from collectibles.models import Collectible
from collections import defaultdict


# Create your views here.
class TradeSerializer(serializers.ModelSerializer):
    trading = CollectibleSerializer(read_only=True)
    requesting1 = CollectibleSerializer(read_only=True)
    requesting2 = CollectibleSerializer(read_only=True)
    requesting3 = CollectibleSerializer(read_only=True)
    class Meta:
        model = Trade
        fields = ['trading', 'requesting1', 'requesting2', 'requesting3', 'price', 'description', 'images', 'id']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['url', 'verified']

class WishListRecommendations(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        collectibles = Collectible.objects.filter(id__in=profile.wishlist.all())
        collectibles = list(collectibles)

        results = defaultdict(list)
        for collectible in collectibles:
            trades = Trade.objects.filter(trading=collectible).exclude(id__in=profile.trades.all())
            results[collectible.id].append(f"{len(trades)}, {collectible.image}")
        return Response(results, status=status.HTTP_200_OK)
    
class MFCRecommendations(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        collectibles = Collectible.objects.exclude(id__in=profile.collection.all())
        collectibles = list(collectibles)

        results = defaultdict(list)
        for collectible in collectibles:
            trades = Trade.objects.filter(trading=collectible).exclude(id__in=profile.trades.all())
            if trades: results[collectible.id].append(f"{len(trades)}, {collectible.image}")

        return Response(results, status=status.HTTP_200_OK)