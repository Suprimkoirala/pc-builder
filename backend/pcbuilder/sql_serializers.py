from rest_framework import serializers
from typing import Dict, Any, List

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, required=False)
    bio = serializers.CharField(allow_blank=True, required=False)
    avatar = serializers.URLField(required=False, allow_null=True)
    is_pro_builder = serializers.BooleanField(default=False)
    is_superuser = serializers.BooleanField(read_only=True)
    is_staff = serializers.BooleanField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    date_joined = serializers.DateTimeField(read_only=True)

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    slug = serializers.CharField(max_length=50)
    icon = serializers.CharField(max_length=50, required=False, allow_blank=True)

class VendorSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    website = serializers.URLField()
    logo = serializers.URLField(required=False, allow_null=True)

class ComponentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=200)
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    category_id = serializers.IntegerField()
    vendor_id = serializers.IntegerField()
    image = serializers.URLField()
    specs = serializers.JSONField()
    stock = serializers.IntegerField(default=100)
    category_name = serializers.CharField(read_only=True)
    category_slug = serializers.CharField(read_only=True)
    vendor_name = serializers.CharField(read_only=True)
    vendor_website = serializers.URLField(read_only=True)

class BuildComponentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    build_id = serializers.IntegerField(read_only=True)
    component_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, default=1)
    notes = serializers.CharField(max_length=200, required=False, allow_blank=True)
    
    # Component details (from JOIN)
    component_name = serializers.CharField(read_only=True)
    component_description = serializers.CharField(read_only=True)
    component_price = serializers.DecimalField(read_only=True, max_digits=10, decimal_places=2)
    component_image = serializers.URLField(read_only=True)
    component_specs = serializers.JSONField(read_only=True)
    component_stock = serializers.IntegerField(read_only=True)
    category_name = serializers.CharField(read_only=True)
    category_slug = serializers.CharField(read_only=True)
    vendor_name = serializers.CharField(read_only=True)
    vendor_website = serializers.URLField(read_only=True)

class BuildSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(required=False, allow_blank=True)
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)
    is_public = serializers.BooleanField(default=True)
    total_price = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    components = serializers.ListField(child=BuildComponentSerializer(), read_only=True)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class MeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    bio = serializers.CharField(allow_blank=True, required=False)
    avatar = serializers.URLField(required=False, allow_null=True)
    is_pro_builder = serializers.BooleanField(read_only=True)

class PublicBuildSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    description = serializers.CharField(read_only=True)
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)
    is_public = serializers.BooleanField(read_only=True)
    total_price = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    user_username = serializers.CharField(read_only=True)
    components = serializers.ListField(child=BuildComponentSerializer(), read_only=True, required=False) 