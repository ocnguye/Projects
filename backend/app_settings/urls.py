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
from collectibles.views import CollectibleViewSet
from profiles.views import ProfileViewSet, ProfileCollection, ProfileWishlist
from trades.views import WishListRecommendations, MFCRecommendations
from featured.views import FeaturedViewSet

router = routers.DefaultRouter()
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/collectibles/', CollectibleViewSet.as_view(), name="collectibles"),
    path('api/profiles/', ProfileViewSet.as_view(), name="profiles"),
    path('api/profiles/collection/', ProfileCollection.as_view(), name="collection"),
    path('api/profiles/wishlist/', ProfileWishlist.as_view(), name="wishlist"),
    path('api/recommendations/wishlist/', WishListRecommendations.as_view(), name="wishlist-recommendations"),
    path('api/recommendations/mfc/', MFCRecommendations.as_view(), name="mfc-recommendations"),
    path('api/featured/', FeaturedViewSet.as_view(), name="featured"),
]
