from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from pcbuilder.auth_views import LoginView, LogoutView, MeView, MyTokenObtainPairView, RegisterView
from pcbuilder.views import *
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'vendors', VendorViewSet)
router.register(r'components', ComponentViewSet)
router.register(r'builds', BuildViewSet)

def root_view(request):
    return HttpResponse("Welcome to the PCB Builder API")

urlpatterns = [
    path('',root_view),
    path('admin/', admin.site.urls),              
    path('api/v1/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/register/', RegisterView.as_view(), name='register'),
    path('api/v1/login/', LoginView.as_view(), name='login'),
    # path('api/v1/logout/', LogoutView.as_view(), name='logout'),
    path('api/v1/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),  # for logout
    # path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),   
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/v1/me/', CurrentUserView.as_view(), name='current_user'),
    path('api/v1/me/', MeView.as_view(), name='me'),
    path('api/v1/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/v1/', include('pcbuilder.urls')),
]