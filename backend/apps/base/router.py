from rest_framework import routers
from .views import *
from django.urls import path, include

router = routers.SimpleRouter()

router.register(r'users', UserViewSet)
router.register(r'products', ProductViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'orderitems', OrderItemViewSet)
router.register(r'shippingaddress', ShippingAddressViewSet)

urlpatterns = router.urls