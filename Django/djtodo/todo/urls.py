from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('routes/', api_routes, name='api_routes'),

    path('send-otp/', send_otp, name='send_otp'),
    path('get-todos/', get_todos, name='get_todos'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('get-user/', get_user, name='get_user'),
    path('update-user/', update_user, name='update_user')
]
