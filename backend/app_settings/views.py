from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.crypto import get_random_string
from rest_framework import status
import boto3

s3_client = boto3.client('s3')
Bucket = 'angel-trading-direct-upload'
Expiration = 60


class S3URLView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        image_name = get_random_string(16)
        resp = s3_client.generate_presigned_url('put_object', Params={
            'Bucket': Bucket,
            'Key': image_name,
            'Expires': Expiration
        })
        return Response({'url': resp}, status=status.HTTP_200_OK)
