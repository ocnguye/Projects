from rest_framework import serializers
from trades.models import Trade
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from profiles.models import Profile
from collectibles.views import CollectibleSerializer


# Create your views here.
class TradeSerializer(serializers.ModelSerializer):
    trading = CollectibleSerializer(read_only=True)
    requesting1 = CollectibleSerializer(read_only=True)
    requesting2 = CollectibleSerializer(read_only=True)
    requesting3 = CollectibleSerializer(read_only=True)
    class Meta:
        model = Trade
        fields = ['trading', 'requesting1', 'requesting2', 'requesting3', 'price', 'description', 'image', 'id']

class WishListRecommendations(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # QUERY:
        #    SELECT * FROM Trade
        #    WHERE id NOT IN Profile.trades
        #    AND id IN Profile.wishlist

        profile = Profile.objects.get(user=request.user)
        trades = Trade.objects.exclude(id__in=profile.trades.all()).filter(id__in=profile.wishlist.all())
        serializer = TradeSerializer(trades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MFCRecommendations(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # QUERY:
        #    SELECT * FROM Trade
        #    WHERE id NOT IN Profile.trades
        #    AND id NOT IN Profile.collection

        profile = Profile.objects.get(user=request.user)
        trades = Trade.objects.exclude(id__in=profile.trades.all()).exclude(id__in=profile.collection.all())
        serializer = TradeSerializer(trades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)