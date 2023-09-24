from django.urls import path
from .views import *

urlpatterns = [
    path("", apiOverview, name="api-overview"),
    path("todo-list/", todoList, name='todo-list'),
    path("todo-detail/<str:pk>/", todoDetail, name='todo-detail'),
    path("todo-create/", todoCreate, name='todo-create'),
    path("todo-update/<str:pk>/", todoUpdate, name='todo-update'),
    path("todo-delete/<str:pk>/", todoDelete, name='todo-delete'),
]
