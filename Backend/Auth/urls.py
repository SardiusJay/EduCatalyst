from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrganizationViewSet
from .views import AuthViewSet


router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet)
router.register(r'auth', AuthViewSet, basename='auth')


urlpatterns = [
    path('', include(router.urls)),
]
