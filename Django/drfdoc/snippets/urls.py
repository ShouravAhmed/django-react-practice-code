from django.urls import path
from .views import *

urlpatterns = [
    path('snippets/', snippetsList, name='snippetsList'),
    path('snippet/<str:pk>/', snippetDetail, name='snippetDetail'),
]
