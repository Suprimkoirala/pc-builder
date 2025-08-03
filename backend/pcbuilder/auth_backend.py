from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .database import UserDB

class SimpleUser:
    """Simple user object that Django can work with"""
    def __init__(self, user_data):
        self.id = user_data['id']
        self.username = user_data['username']
        self.email = user_data['email']
        self.is_authenticated = True
        self.is_anonymous = False
        self.is_superuser = user_data.get('is_superuser', False)
        self.is_staff = user_data.get('is_staff', False)
        self.is_active = user_data.get('is_active', True)
        self.date_joined = user_data.get('date_joined')
        self.first_name = user_data.get('first_name', '')
        self.last_name = user_data.get('last_name', '')
        
        # Store the original user data
        self._user_data = user_data
    
    def get_username(self):
        return self.username
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    def get_short_name(self):
        return self.first_name

class CustomJWTAuthentication(JWTAuthentication):
    """Custom JWT authentication that works with our SQL-based user system"""
    
    def get_user(self, validated_token):
        """
        Attempts to find and return a user using the given validated token.
        """
        try:
            user_id = validated_token['user_id']
            user_db = UserDB()
            user_data = user_db.get_user_by_id(user_id)
            
            if user_data:
                return SimpleUser(user_data)
            else:
                raise InvalidToken('User not found')
        except Exception as e:
            raise InvalidToken('User not found')

class SQLiteAuthBackend(BaseBackend):
    def authenticate(self, request, username=None, email=None, password=None):
        user_db = UserDB()
        
        # Try to get user by email first, then by username
        user = None
        if email:
            user = user_db.get_user_by_email(email)
        elif username:
            user = user_db.get_user_by_username(username)
        
        if user and check_password(password, user['password']):
            return SimpleUser(user)
        
        return None
    
    def get_user(self, user_id):
        user_db = UserDB()
        user = user_db.get_user_by_id(user_id)
        
        if user:
            return SimpleUser(user)
        
        return None 