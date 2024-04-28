from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Collectible
from rest_framework.response import Response
from django.db.models import Q
from trades.models import Listing
from trades.serializers import ListingSerializer
from .serializers import CollectibleSerializer
from profiles.models import Profile

class CollectibleViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        collectibles = Collectible.objects.all()
        serializer = CollectibleSerializer(collectibles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CollectiblesByID(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            id = request.query_params.get('id')
            collectible = Collectible.objects.get(id=id)
            profile = Profile.objects.get(user=request.user)
            listings = Listing.objects.filter(collectible=collectible).exclude(user=profile)
            listings_serializer = ListingSerializer(listings, many=True)
            collectible_serializer = CollectibleSerializer(collectible)
            return Response({
                'collectible': collectible_serializer.data,
                'listings': listings_serializer.data,
                'results': len(listings_serializer.data),
            }, status=status.HTTP_200_OK)
        except:
            return Response({
                'error': 'Collectible not found'
            }, status=status.HTTP_400_BAD_REQUEST)

class ListingSaved(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        id = request.query_params.get('id')
        listing = Listing.objects.get(id=id)
        data = {
            'saved': listing in profile.saved.all()
        }
        return Response(data, status=status.HTTP_200_OK)
        
    def post(self, request):
        profile = Profile.objects.get(user=request.user)
        id = request.query_params.get('id')
        listing = Listing.objects.get(id=id)
        if listing in profile.saved.all():
            profile.saved.remove(listing)
        else:
            profile.saved.add(listing)
        profile.save()
        return Response({
            'saved': listing in profile.saved.all()
        }, status=status.HTTP_200_OK)

class SearchCollectibles(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search_query = request.query_params.get('search')

        direct_collectibles = Collectible.objects.filter(
            Q(name__icontains=search_query) | 
            Q(series__icontains=search_query)
        )
        direct_trades = Listing.objects.filter(collectible__in=direct_collectibles)

        series_list = [collectible.series for collectible in direct_collectibles]
        related_trades = Listing.objects.filter(collectible__series__in=series_list)

        direct_trades_serializer = ListingSerializer(direct_trades, many=True)
        related_trades_serializer = ListingSerializer(related_trades, many=True)
        related_trades_serializer = [ trade for trade in related_trades_serializer.data if trade not in direct_trades_serializer.data ]
        trades = direct_trades_serializer.data + related_trades_serializer

        return Response({
            'results': len(trades),
            'listings': trades,
            'series': series_list,
        }, status=status.HTTP_200_OK)



