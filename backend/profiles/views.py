from django.shortcuts import render
from rest_framework import serializers
from .models import Profile
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from collectibles.models import Collectible
from collectibles.views import CollectibleSerializer
from trades.models import Trade, Image
from trades.views import TradeSerializer

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'collection', 'wishlist', 'trades', 'rating', 'raters', 'username', 'profile_img']

class ProfileViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        collection = CollectibleSerializer(profile.collection, many=True)
        wishlist = CollectibleSerializer(profile.wishlist, many=True)
        trades = TradeSerializer(profile.trades, many=True)
        data = {
            "url": serializer.data["bio"],
            "username": serializer.data["username"],
            "profile_img": serializer.data["profile_img"],
            "rating": serializer.data["rating"],
            "raters": serializer.data["raters"],
            "collection": collection.data,
            "wishlist": wishlist.data,
            "trades": trades.data,
        }
        return Response(data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        profile = Profile.objects.get(user=request.user)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ProfileCollection(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        profile = Profile.objects.get(user=request.user)
        profile.collection.add( Collectible.objects.get(id=request.data['collectible']) )
        profile.save()
        return Response(status=status.HTTP_201_CREATED)
    
    def delete(self, request):
        profile = Profile.objects.get(user=request.user)
        profile.collection.remove( Collectible.objects.get(id=request.data['collectible']) )
        profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ProfileWishlist(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        profile = Profile.objects.get(user=request.user)
        profile.wishlist.add( Collectible.objects.get(id=request.data['collectible']) )
        profile.save()
        return Response(status=status.HTTP_201_CREATED)
    
    def delete(self, request):
        profile = Profile.objects.get(user=request.user)
        profile.wishlist.remove( Collectible.objects.get(id=request.data['collectible']) )
        profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ProfileTrade(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        profile = Profile.objects.get(user=request.user)
        if request.data['requesting1']: r1Id = Collectible.objects.get(id=request.data['requesting1'])
        else: r1Id = None
        if request.data['requesting2']: r2Id = Collectible.objects.get(id=request.data['requesting2'])
        else: r2Id = None
        if request.data['requesting3']: r3Id = Collectible.objects.get(id=request.data['requesting3'])
        else: r3Id = None
        if request.data['verifyImage']: vImg = Image.objects.get(url=request.data['verifyImage'])
        else: vImg = None

        trade = Trade.objects.create(
            trading=Collectible.objects.get(id=request.data['trading']),
            requesting1=r1Id,
            requesting2=r2Id,
            requesting3=r3Id,
            price=(float(request.data['price'])),
            description=request.data['description'],
            images=request.data['images'],
            verified= vImg.verified if vImg else False,
        )
        profile.trades.add(trade)
        profile.save()
        return Response(status=status.HTTP_201_CREATED)
    
    def delete(self, request):
        profile = Profile.objects.get(user=request.user)
        trade = Trade.objects.get(id=request.data['trade'])
        profile.trades.remove(trade)
        trade.delete()
        profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)