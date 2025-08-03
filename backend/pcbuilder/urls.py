from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    ComponentViewSet, UserViewSet, CategoryViewSet, VendorViewSet, 
    BuildViewSet, BuildComponentView, PublicBuildViewSet, CurrentUserView
)

router = DefaultRouter()
router.register(r'components', ComponentViewSet, basename='component')
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'vendors', VendorViewSet, basename='vendor')
router.register(r'builds', BuildViewSet, basename='build')
router.register(r'public-builds', PublicBuildViewSet, basename='public-build')

urlpatterns = router.urls + [
    path('current-user/', CurrentUserView.as_view(), name='current-user'),
    path('builds/<int:build_id>/components/', BuildComponentView.as_view(), name='build-components'),
    path('builds/<int:build_id>/components/<int:component_id>/', BuildComponentView.as_view(), name='build-component-detail'),
]
