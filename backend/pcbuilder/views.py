from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .sql_serializers import *
from .database import UserDB, CategoryDB, VendorDB, ComponentDB, BuildDB, BuildComponentDB, PublicBuildDB
from .compatibility_checker import CompatibilityChecker
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj['user_id'] == request.user.id

class UserViewSet(viewsets.ViewSet):
    permission_classes = []
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_db = UserDB()
    
    def list(self, request):
        users = self.user_db.get_all_users()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        user = self.user_db.get_user_by_id(int(pk))
        if user:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response({'error': 'User not found'}, status=404)

class CurrentUserView(APIView):
    permission_classes = []
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_db = UserDB()

    def get(self, request):
        if request.user.is_authenticated:
            user = self.user_db.get_user_by_id(request.user.id)
            if user:
                serializer = UserSerializer(user)
                return Response(serializer.data)
        return Response({'error': 'User not found'}, status=404)

class CategoryViewSet(viewsets.ViewSet):
    permission_classes = []
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.category_db = CategoryDB()
    
    def list(self, request):
        categories = self.category_db.get_all_categories()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        category = self.category_db.get_category_by_id(int(pk))
        if category:
            serializer = CategorySerializer(category)
            return Response(serializer.data)
        return Response({'error': 'Category not found'}, status=404)

class VendorViewSet(viewsets.ViewSet):
    permission_classes = []
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.vendor_db = VendorDB()
    
    def list(self, request):
        vendors = self.vendor_db.get_all_vendors()
        serializer = VendorSerializer(vendors, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        vendor = self.vendor_db.get_vendor_by_id(int(pk))
        if vendor:
            serializer = VendorSerializer(vendor)
            return Response(serializer.data)
        return Response({'error': 'Vendor not found'}, status=404)

class ComponentViewSet(viewsets.ViewSet):
    permission_classes = []
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.component_db = ComponentDB()
    
    def list(self, request):
        category = request.query_params.get('category')
        if category:
            components = self.component_db.get_components_by_category(category)
        else:
            components = self.component_db.get_all_components()
        serializer = ComponentSerializer(components, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        component = self.component_db.get_component_by_id(int(pk))
        if component:
            serializer = ComponentSerializer(component)
            return Response(serializer.data)
        return Response({'error': 'Component not found'}, status=404)

class BuildViewSet(viewsets.ViewSet):
    permission_classes = []  # Temporarily remove authentication requirement
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.build_db = BuildDB()
        self.build_component_db = BuildComponentDB()
    
    def list(self, request):
        builds = self.build_db.get_user_builds(request.user.id)
        # Add components to each build
        for build in builds:
            components = self.build_component_db.get_build_components(build['id'])
            build['components'] = components
        
        serializer = BuildSerializer(builds, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = BuildSerializer(data=request.data)
        if serializer.is_valid():
            # For now, just use user ID 1 as default
            user_id = 1
            
            build_id = self.build_db.create_build(
                user_id=user_id,
                name=serializer.validated_data['name'],
                description=serializer.validated_data.get('description', ''),
                is_public=serializer.validated_data.get('is_public', True)
            )
            build = self.build_db.get_build_by_id(build_id)
            build['components'] = []
            serializer = BuildSerializer(build)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def retrieve(self, request, pk=None):
        build = self.build_db.get_build_by_id(int(pk))
        if build and build['user_id'] == request.user.id:
            components = self.build_component_db.get_build_components(build['id'])
            build['components'] = components
            serializer = BuildSerializer(build)
            return Response(serializer.data)
        return Response({'error': 'Build not found'}, status=404)
    
    def update(self, request, pk=None):
        build = self.build_db.get_build_by_id(int(pk))
        if not build or build['user_id'] != request.user.id:
            return Response({'error': 'Build not found'}, status=404)
        
        serializer = BuildSerializer(build, data=request.data, partial=True)
        if serializer.is_valid():
            success = self.build_db.update_build(
                build_id=int(pk),
                name=serializer.validated_data.get('name'),
                description=serializer.validated_data.get('description'),
                is_public=serializer.validated_data.get('is_public')
            )
            if success:
                updated_build = self.build_db.get_build_by_id(int(pk))
                components = self.build_component_db.get_build_components(updated_build['id'])
                updated_build['components'] = components
                serializer = BuildSerializer(updated_build)
                return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def destroy(self, request, pk=None):
        build = self.build_db.get_build_by_id(int(pk))
        if not build or build['user_id'] != request.user.id:
            return Response({'error': 'Build not found'}, status=404)
        
        success = self.build_db.delete_build(int(pk))
        if success:
            return Response(status=204)
        return Response({'error': 'Failed to delete build'}, status=400)

class BuildComponentView(APIView):
    permission_classes = []  # Temporarily remove authentication requirement
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.build_db = BuildDB()
        self.build_component_db = BuildComponentDB()
    
    @swagger_auto_schema(request_body=BuildComponentSerializer)
    def post(self, request, build_id):
        # Temporarily remove user ownership check
        build = self.build_db.get_build_by_id(int(build_id))
        if not build:
            return Response({'error': 'Build not found'}, status=404)
        
        serializer = BuildComponentSerializer(data=request.data)
        if serializer.is_valid():
            component_id = self.build_component_db.add_component_to_build(
                build_id=int(build_id),
                component_id=serializer.validated_data['component_id'],
                quantity=serializer.validated_data.get('quantity', 1),
                notes=serializer.validated_data.get('notes', '')
            )
            
            # Update build total price
            self.build_db.update_build_total_price(int(build_id))
            
            return Response({'message': 'Component added to build'}, status=201)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, build_id, component_id):
        # Temporarily remove user ownership check
        build = self.build_db.get_build_by_id(int(build_id))
        if not build:
            return Response({'error': 'Build not found'}, status=404)
        
        success = self.build_component_db.remove_component_from_build(int(build_id), int(component_id))
        if success:
            # Update build total price
            self.build_db.update_build_total_price(int(build_id))
            return Response(status=204)
        return Response({'error': 'Component not found in build'}, status=404)

class PublicBuildViewSet(viewsets.ViewSet):
    permission_classes = []
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.public_build_db = PublicBuildDB()
        self.build_component_db = BuildComponentDB()
    
    def list(self, request):
        builds = self.public_build_db.get_public_builds()
        # Add components to each build
        for build in builds:
            components = self.build_component_db.get_build_components(build['id'])
            build['components'] = components
        
        serializer = PublicBuildSerializer(builds, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        build = self.public_build_db.get_public_builds()
        build = next((b for b in build if b['id'] == int(pk)), None)
        if build:
            components = self.build_component_db.get_build_components(build['id'])
            build['components'] = components
            serializer = PublicBuildSerializer(build)
            return Response(serializer.data)
        return Response({'error': 'Public build not found'}, status=404)

class CompatibilityView(APIView):
    permission_classes = []
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.compatibility_checker = CompatibilityChecker()
        self.component_db = ComponentDB()
    
    def post(self, request):
        """Check compatibility between two components"""
        component1_id = request.data.get('component1_id')
        component2_id = request.data.get('component2_id')
        
        if not component1_id or not component2_id:
            return Response({
                'error': 'Both component1_id and component2_id are required'
            }, status=400)
        
        try:
            result = self.compatibility_checker.check_compatibility(
                int(component1_id), int(component2_id)
            )
            return Response(result)
        except Exception as e:
            return Response({
                'error': f'Compatibility check failed: {str(e)}'
            }, status=500)
    
    def get(self, request):
        """Check compatibility for a build"""
        build_id = request.query_params.get('build_id')
        
        if not build_id:
            return Response({
                'error': 'build_id parameter is required'
            }, status=400)
        
        try:
            # Get build components
            build_component_db = BuildComponentDB()
            build_components = build_component_db.get_build_components(int(build_id))
            
            if not build_components:
                return Response({
                    'error': 'No components found in build'
                }, status=404)
            
            # Convert to component objects for compatibility checker
            components = []
            for bc in build_components:
                component = self.component_db.get_component_by_id(bc['component_id'])
                if component:
                    components.append(component)
            
            result = self.compatibility_checker.check_build_compatibility(components)
            return Response(result)
        except Exception as e:
            return Response({
                'error': f'Build compatibility check failed: {str(e)}'
            }, status=500)