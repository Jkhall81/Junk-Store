from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .serializers import *
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.exceptions import MethodNotAllowed
from drf_yasg.utils import swagger_auto_schema


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v
        
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed('POST')
    
    
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    
    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]      
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Update the quantity in stock for the related product
        order_item = serializer.instance
        product = order_item.product
        product.countInStock -= order_item.qty
        product.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['GET'], url_path=r'by_order/(?P<order_id>[^/.]+)')
    def by_order(self, request, *args, **kwargs):
        order_id = self.kwargs.get('order_id')
        if not order_id:
            return Response({'error': 'Order ID parameter is required Homie!'}, status=400)
        
        shipping_address = ShippingAddress.objects.filter(order=order_id).first()
        shipping_address_serializer = ShippingAddressSerializer(shipping_address)
        
        order_items = OrderItem.objects.filter(order=order_id)
        serializer = self.get_serializer(order_items, many=True)
        
        response_data = {
            'order_items': serializer.data,
            'shipping_address': shipping_address_serializer.data,
        }
        return Response(response_data, status=status.HTTP_200_OK) 
    
    
class ShippingAddressViewSet(viewsets.ModelViewSet):
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated]
