from rest_framework import serializers
from .models import Organization
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class OrganizationSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Organization
        fields = [
            'id', 
            'name', 
            'email', 
            'website_link', 
            'description', 
            'logo', 
            'created_at', 
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError("Organization name must be at least 2 characters long")
        return value

    def validate_description(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("Description must be at least 10 characters long")
        return value
    

    
class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login
    """
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            raise serializers.ValidationError("Both email and password are required")
        
        return data


from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'], 
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    def validate(self, data):
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists"})
        
        return data
    

    