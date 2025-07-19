from rest_framework.routers import DefaultRouter
from .views import ComponentViewSet
from pcbuilder.views import *

router = DefaultRouter()
router.register(r'components', ComponentViewSet, basename='component')   # now DRF can infer the basename
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'vendors', VendorViewSet, basename='vendor')
router.register(r'builds', BuildViewSet, basename='build')

urlpatterns = router.urls
