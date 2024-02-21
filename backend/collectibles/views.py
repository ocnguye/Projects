from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Collectible
from rest_framework.response import Response

# Create your views here.

class CollectibleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collectible
        fields = ['product', 'series', 'name', 'image']

class CollectibleViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        collectibles = Collectible.objects.all()
        serializer = CollectibleSerializer(collectibles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



