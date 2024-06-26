"""
URL configuration for app_settings project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from collectibles.views import CollectibleViewSet, SearchCollectibles, CollectiblesByID, ListingSaved
from profiles.views import ProfileViewSet, ProfileListing, ProfileContact, ProfileWishlist, ProfileCollection, ProfileBio
from trades.views import WishListRecommendations, MFCRecommendations
from featured.views import FeaturedViewSet
from app_settings.views import S3URLView, ImageVerification, StreamView, StreamTokenView, StreamChannelView

router = routers.DefaultRouter()
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/collectibles/', CollectibleViewSet.as_view(), name="collectibles"),
    path('api/collectibles/id/', CollectiblesByID.as_view(), name="collectibles-id"),
    path('api/profiles/', ProfileViewSet.as_view(), name="profiles"),
    path('api/profiles/bio/', ProfileBio.as_view(), name="bio"),
    path('api/profiles/trades/', ProfileListing.as_view(), name="listings"),
    path('api/profiles/wishlist/', ProfileWishlist.as_view(), name = "wishlist"),
    path('api/profiles/collection/', ProfileCollection.as_view(), name="collection"),
    path('api/profiles/saved/', ListingSaved.as_view(), name="saved"),
    path('api/recommendations/wishlist/', WishListRecommendations.as_view(), name="wishlist-recommendations"),
    path('api/recommendations/mfc/', MFCRecommendations.as_view(), name="mfc-recommendations"),
    path('api/featured/', FeaturedViewSet.as_view(), name="featured"),
    path('api/s3', S3URLView.as_view(), name="s3"),
    path('api/verify/', ImageVerification.as_view(), name="verify"),
    path('api/search', SearchCollectibles.as_view(), name="search"),
    path('api/contacts/', ProfileContact.as_view(), name="contact"),
    path('api/register-user/', StreamView.as_view(), name="stream"),
    path('api/token/', StreamTokenView.as_view(), name='token'),
    path('api/channel/', StreamChannelView.as_view(), name='channel'),
    
]
