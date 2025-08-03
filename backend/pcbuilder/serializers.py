from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'bio', 'avatar', 'is_pro_builder']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

class ComponentSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    vendor = VendorSerializer(read_only=True)
    
    class Meta:
        model = Component
        fields = '__all__'

class BuildComponentSerializer(serializers.ModelSerializer):
    component = ComponentSerializer()
    
    class Meta:
        model = BuildComponent
        fields = ['id', 'component', 'quantity', 'notes']

class BuildSerializer(serializers.ModelSerializer):
    components = BuildComponentSerializer(source='components.all', many=True)
    
    class Meta:
        model = Build
        fields = ['id', 'name', 'description', 'created', 'updated', 
                 'is_public', 'total_price', 'components']

# serializers.py

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