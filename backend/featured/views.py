from django.shortcuts import render
from .models import Featured
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class FeaturedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Featured
        fields = ['name', 'description', 'link', 'address', 'image', 'id']

class FeaturedViewSet(APIView):
    permission_classes = [IsAuthenticated] 
    
    def get(self, request):
        featured = Featured.objects.all()
        serializer = FeaturedSerializer(featured, many=True)
        return Response(serializer.data)
