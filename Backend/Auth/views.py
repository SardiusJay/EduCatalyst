from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserLoginSerializer, OrganizationSerializer, UserRegistrationSerializer
from .models import Organization
from django.contrib.auth import get_user_model

User = get_user_model()


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [AllowAny]  
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            
            logo = request.FILES.get('logo')
            if logo:
                serializer.validated_data['logo'] = logo
            self.perform_create(serializer)
            
            return Response(
                serializer.data, 
                status=status.HTTP_201_CREATED
            )
        
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        """
        Handle user login and return JWT tokens
        """
        serializer = UserLoginSerializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            
            user = authenticate(
                request, 
                username=email, 
                password=password
            )

            if user is not None:
                refresh = RefreshToken.for_user(user)
                
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user_id': user.id,
                    'email': user.email,
                    'message': 'Login successful'
                }, status=status.HTTP_200_OK)
            
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        """
        Handle user registration
        """
        try:
            serializer = UserRegistrationSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id,
                'email': user.email,
                'message': 'Registration successful'
            }, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        

