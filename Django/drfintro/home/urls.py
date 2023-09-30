from django.urls import path
from . import views

urlpatterns = [
    path('create-todo/', views.create_todo, name='create_todo'),
    path('get-todos/', views.get_todos, name='get_todos'),
    path('get-todo/<str:pk>/', views.get_todo, name='get_todo'),
    path('update-todo/', views.update_todo, name='update_todo'),
]
