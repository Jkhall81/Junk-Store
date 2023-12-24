from django.urls import path, include
from .router import router
from .views import MyTokenObtainPairView

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
