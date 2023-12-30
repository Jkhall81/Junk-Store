from rest_framework import serializers
from rest_framework.response import Response
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_serializer_method
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from datetime import timedelta


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Password fields didn't match"})
        
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        return user
        

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    password = serializers.CharField(write_only=True, allow_blank=True, required=False)
    
    
    class Meta:
        model = User
        fields = ['_id', 'id', 'username', 'name', 'isAdmin', 'first_name', 'last_name', 'password']
        
        
    def get_isAdmin(self, obj):
        return obj.is_staff
        
    def get__id(self, obj):
        return obj.id
        
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
    def update(self, instance, validated_data):
        if 'first_name' in validated_data:
            instance.first_name = validated_data['first_name']
            
        if 'last_name' in validated_data:
            instance.last_name = validated_data['last_name']
            
        if 'username' in validated_data:
            instance.email = validated_data['username']
        
        if 'password' in validated_data and validated_data['password']:
            instance.password = make_password(validated_data['password'])
        
        instance.save()
        
        return instance
    

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['_id', 'id', 'username', 'email', 'name', 'isAdmin', 'token']
        
    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        access_token = refresh.access_token
        
        return {
            'refresh': str(refresh),
            'access': str(access_token),
        }
    
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
        

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields= '__all__'
        
    def create(self, validated_data):
        address = validated_data.get('address', None)
        city = validated_data.get('city', None)
        postalCode = validated_data.get('postalCode', None)
        country = validated_data.get('country', None)
        
        existing_entry = ShippingAddress.objects.filter(
            address=address,
            city=city,
            postalCode=postalCode,
            country=country
        ).first()
        
        if existing_entry:
            return existing_entry
        
        shipping_address = ShippingAddress.objects.create(**validated_data)
        return shipping_address
