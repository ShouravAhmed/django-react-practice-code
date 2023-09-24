from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Todo
from .serializers import TodoSerializer

import logging
logger = logging.getLogger(__name__)


@api_view(["GET"])
def apiOverview(request):
    api_urls = {
        "List": "/todo-list/",
        "Detail View": "/todo-detail/<str:pk>/",
        "Create": "/todo-create/",
        "Update": "/todo-update/<str:pk>/",
        "Delete": "/todo-delete/<str:pk>/",
    }
    return Response(api_urls)


@api_view(["GET"])
def todoList(request):
    todos = Todo.objects.all().order_by('-id')
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def todoDetail(request, pk):
    todo = Todo.objects.filter(id=pk).first() or None
    serializer = TodoSerializer(todo, many=False) if todo else None
    return Response(serializer.data if serializer else {})


@api_view(["POST"])
def todoCreate(request):
    serializer = TodoSerializer(data=request.data)
    if serializer. is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["POST"])
def todoUpdate(request, pk):
    todo = Todo.objects.get(id=pk)
    serializer = TodoSerializer(instance=todo, data=request.data)
    if serializer. is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["DELETE"])
def todoDelete(request, pk):
    try:
        todo = Todo.objects.get(id=pk)
        todo.delete()
    except Exception as e:
        logger.debug(e)
        return Response('Item Already Deleted')
    return Response('Item deleted Successfully')
