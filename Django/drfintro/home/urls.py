from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'todo-viewset', TodoViewSet, basename='todo')

urlpatterns = [
    path('create-todo/', create_todo, name='create_todo'),
    path('get-todos/', get_todos, name='get_todos'),
    path('get-todo/<str:pk>/', get_todo, name='get_todo'),
    path('update-todo/', update_todo, name='update_todo'),
    path('delete-todo/', delete_todo, name='delete_todo'),

    path('todo/', TodoView.as_view()),

    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls
