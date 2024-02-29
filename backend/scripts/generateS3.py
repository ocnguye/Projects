from collectibles.models import Collectible
from django.utils.crypto import get_random_string
import boto3
from environ import Env

env = Env()
env.read_env()
access = env("AWS_ACCESS_KEY_ID")
secret = env("AWS_SECRET_KEY")
region = env("AWS_REGION")

s3_client = boto3.client('s3', aws_access_key_id=access, aws_secret_access_key=secret, region_name=region)

Bucket = 'angel-trading-direct-upload'
Expiration = 36000

image_name = get_random_string(16)
resp = s3_client.generate_presigned_url('put_object', Params={
    'Bucket': Bucket,
    'Key': image_name,
    'Expires': Expiration
})

print(resp)