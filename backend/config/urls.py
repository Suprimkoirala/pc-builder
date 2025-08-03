from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from pcbuilder.auth_views import LoginView, LogoutView, MeView, MyTokenObtainPairView, RegisterView
from pcbuilder.views import (
    UserViewSet, CategoryViewSet, VendorViewSet, ComponentViewSet, 
    BuildViewSet, BuildComponentView, PublicBuildViewSet, CurrentUserView, CompatibilityView
)
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'vendors', VendorViewSet, basename='vendor')
router.register(r'components', ComponentViewSet, basename='component')
router.register(r'builds', BuildViewSet, basename='build')
router.register(r'public-builds', PublicBuildViewSet, basename='public-build')

from django.shortcuts import redirect

def root_view(request):
    return redirect('/swagger/')

# Swagger Schema View
schema_view = get_schema_view(
    openapi.Info(
        title="PC Builder API",
        default_version='v1',
        description="API for PC Builder application",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@pcbuilder.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

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
    path('api/v1/current-user/', CurrentUserView.as_view(), name='current-user'),
    path('api/v1/builds/<int:build_id>/components/', BuildComponentView.as_view(), name='build-components'),
    path('api/v1/builds/<int:build_id>/components/<int:component_id>/', BuildComponentView.as_view(), name='build-component-detail'),
    path('api/v1/compatibility/', CompatibilityView.as_view(), name='compatibility'),
    # path('api/v1/', include('pcbuilder.urls')),
    
    # Swagger URLs
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]