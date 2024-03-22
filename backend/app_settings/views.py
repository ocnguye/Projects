from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.crypto import get_random_string
from rest_framework import status
import boto3
from environ import Env
from openai import OpenAI
from trades.models import Image

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
        return Response({'url': resp['url'], 'fields': resp['fields']}, status=status.HTTP_200_OK)

openai_key = env('OPENAI_KEY')
client = OpenAI(api_key=openai_key)
class ImageVerification(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        image = request.data['image']
        response = client.chat.completions.create(
            model='gpt-4-vision-preview',
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Does this image contain the SMISKI company signature? Return a 'y' for yes, or 'n' for no."},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image
                            },
                        },
                    ],
                }
            ],
            max_tokens=100,
        )
        if response.choices[0].message.content == 'y':
            Image.objects.get_or_create(url=image, verified=True)
            resp = True
        else:
            Image.objects.get_or_create(url=image, verified=False)
            resp = False
        return Response({'verified': resp}, status=status.HTTP_200_OK)
