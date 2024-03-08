from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.crypto import get_random_string
from rest_framework import status
import boto3
from environ import Env

env = Env()
env.read_env()
access = env.str('AWS_ACCESS_KEY_ID')
secret = env.str('AWS_SECRET_KEY')
region = env.str('AWS_REGION')

s3_client = boto3.client('s3', 
                      aws_access_key_id=access, 
                      aws_secret_access_key=secret, 
                      region_name=region,
            )

Bucket = 'angel-trading-direct-upload'
Expiration = 3600


class S3URLView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        image_name = get_random_string(16)
        resp = s3_client.generate_presigned_post(Bucket,
                                                 image_name,
                                                 Fields=None,
                                                 Conditions=None,
                                                 ExpiresIn=Expiration)
        print(resp)
        # resp = s3_client.generate_presigned_url('put_object', Params={
        #     'Bucket': Bucket,
        #     'Key': image_name,
        #     'Expires': Expiration,
        #     'ContentType': 'image/*'
        # },
        # )
        return Response({'url': resp['url'], 'fields': resp['fields']}, status=status.HTTP_200_OK)
