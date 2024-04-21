from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.crypto import get_random_string
from rest_framework import status
import boto3
from environ import Env
from openai import OpenAI
from trades.models import Image
from stream_chat import StreamChat
from profiles.models import Profile
import requests

env = Env()
env.read_env()
access = env.str('AWS_ACCESS_KEY_ID')
secret = env.str('AWS_SECRET_KEY')
region = env.str('AWS_REGION')
STREAM_SECRET = env.str('STREAM_SECRET')
STREAM_API = env.str('STREAM_API')
CLERK_SECRET_KEY = env.str("CLERK_SECRET_KEY")

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
        
class StreamView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            chat = StreamChat(api_key=STREAM_API, api_secret=STREAM_SECRET)
            profile = Profile.objects.get(user=request.user)
            userId = request.data['userId']
            name = request.data['name']
            
            if not userId or not name: 
                return Response(status=status.HTTP_400_BAD_REQUEST)
            resp = chat.upsert_user({
                "id": userId, 
                "name": name,
                "role": "user",
                "image": profile.profile_img,
            })
            print("resp:", resp)
            url = f"https://api.clerk.com/v1/users/{userId}/metadata"
            headers = {
                'Authorization': f'Bearer {CLERK_SECRET_KEY}',
                'Content-type': 'application/json'
            }
            data = {
                "public_metadata": {
                    "streamRegistered": True
                }
            }
            requests.patch(url, headers=headers, json=data)
            
            response = {
                "userId": userId,
                "userName": name,
            }
    
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StreamTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            chat = StreamChat(api_key=STREAM_API, api_secret=STREAM_SECRET)
            userId = request.data['userId']
            token = chat.create_token(userId)
            print("userId:", userId)
            print("token:", token)
            return Response({'userId': userId,'token': token}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
