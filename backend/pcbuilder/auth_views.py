from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from .sql_serializers import UserSerializer, LoginSerializer, MeSerializer
from .database import UserDB
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .auth_serializers import MyTokenObtainPairSerializer
from django.contrib.auth.hashers import check_password

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_db = UserDB()

    @swagger_auto_schema(responses={200: MeSerializer})
    def get(self, request):
        if request.user.is_authenticated:
            user = self.user_db.get_user_by_id(request.user.id)
            if user:
                serializer = MeSerializer(user)
                return Response(serializer.data)
        return Response({'error': 'User not found'}, status=404)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_db = UserDB()
    
    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Create user using SQL
            user_id = self.user_db.create_user(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password'],
                bio=serializer.validated_data.get('bio', ''),
                avatar=serializer.validated_data.get('avatar', ''),
                is_pro_builder=serializer.validated_data.get('is_pro_builder', False)
            )
            
            # Get the created user
            user = self.user_db.get_user_by_id(user_id)
            if user:
                # Create JWT tokens
                refresh = RefreshToken()
                refresh['user_id'] = user_id
                refresh['username'] = user['username']
                refresh['email'] = user['email']
                
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': UserSerializer(user).data
                }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_db = UserDB()
    
    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get user by email using SQL
        user = self.user_db.get_user_by_email(email)
        if user and check_password(password, user['password']):
            # Create JWT tokens
            refresh = RefreshToken()
            refresh['user_id'] = user['id']
            refresh['username'] = user['username']
            refresh['email'] = user['email']
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)