from rest_framework import serializers
from .models import Profile
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from collectibles.models import Collectible
from collectibles.serializers import CollectibleSerializer
from trades.models import Trade, Image, Listing
from trades.serializers import TradeSerializer, ListingSerializer

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'collection', 'wishlist', 'trades', 'rating', 'raters', 'username', 'profile_img']

class ProfileViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            id = request.query_params.get('id')
            profile = Profile.objects.get(user__username=id)
            serializer = ProfileSerializer(profile)
            collection = ListingSerializer(profile.collection, many=True)
            wishlist = CollectibleSerializer(profile.wishlist, many=True)
            trades = TradeSerializer(profile.trades, many=True)
            saved = ListingSerializer(profile.saved, many=True)
            data = {
                "bio": serializer.data["bio"],
                "username": serializer.data["username"],
                "profile_img": serializer.data["profile_img"],
                "rating": serializer.data["rating"],
                "raters": serializer.data["raters"],
                "collection": collection.data,
                "wishlist": wishlist.data,
                "trades": trades.data,
                "saved": saved.data,
            }
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request):
        profile = Profile.objects.get(user=request.user)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProfileBio(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            id = request.query_params.get('id')
            profile = Profile.objects.get(user=request.user)
            if (profile.user.username != id): return Response(status=status.HTTP_403_FORBIDDEN)
            profile.bio = request.data['bio']
            profile.save()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
class ProfileListing(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        profile = Profile.objects.get(user=request.user)
        if request.data['verifyImage']: vImg = Image.objects.get(url=request.data['verifyImage'])
        else: vImg = None

        listing = Listing.objects.create(
            collectible=Collectible.objects.get(id=request.data['collectible']),
            available=request.data['available'],
            price=(float(request.data['price'])),
            description=request.data['description'],
            images=request.data['images'],
            verified= vImg.verified if vImg else False,
            user=profile,
        )
        profile.collection.add(listing)
        profile.save()
        return Response(status=status.HTTP_201_CREATED)
    
    
    def get(self, request):
        all_collectibles = Collectible.objects.all()
        serializer = CollectibleSerializer(all_collectibles, many=True, context = {'request': request})
        return Response({"collectibles": serializer.data}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        profile = Profile.objects.get(user=request.user)
        listing = Listing.objects.get(id=request.data['listing'])
        profile.collection.remove(listing)
        listing.delete()
        profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProfileCollection(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            id = request.query_params.get("id")
            cId = request.query_params.get("cId")
            profile = Profile.objects.get(user=request.user)
            if (profile.user.username != id): return Response(status=status.HTTP_403_FORBIDDEN)
            collectible = Collectible.objects.get(id=cId)
            if collectible in profile.in_collection.all():
                profile.in_collection.remove(collectible)
            else:
                profile.in_collection.add(collectible)
            profile.save()
            all_collectibles = Collectible.objects.all()
            serializer = CollectibleSerializer(all_collectibles, many=True, context = {'request': request})
            return Response({"collectibles": serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
class ProfileContact(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        otheruser = request.query_params.get("userId")
        profile = Profile.objects.get(user__username=otheruser)
        profile = ProfileSerializer(profile).data
        data = {
            "profile_img": profile["profile_img"],
            "username": profile["username"],
            "rating": profile["rating"],
            "raters": profile["raters"],
        }
        return Response( data , status=status.HTTP_200_OK)

class ProfileWishlist(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            id = request.query_params.get("id")
            cId = request.query_params.get("cId")
            profile = Profile.objects.get(user=request.user)
            if (profile.user.username != id): return Response(status=status.HTTP_403_FORBIDDEN)
            collectible = Collectible.objects.get(id=cId)
            if collectible in profile.wishlist.all():
                profile.wishlist.remove(collectible)
            else:
                profile.wishlist.add(collectible)
            profile.save()
            all_collectibles = Collectible.objects.all()
            serializer = CollectibleSerializer(all_collectibles, many=True, context = {'request': request})
            return Response({"collectibles": serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
