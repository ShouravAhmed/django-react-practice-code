from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *
from .models import *


@api_view(['POST'])
def create_todo(request):
    resp = {'status': 200, 'message': 'Success'}
    try:
        serializer = TodoSerializer(data=request.data)

        if serializer.is_valid() and not request.data.get('is_completed', False):
            serializer.save()
            resp['data'] = serializer.data
        else:
            resp['status'] = 400
            resp['message'] = "Invalid data"
            resp['errors'] = serializer.errors
            if request.data.get('is_completed', False):
                resp['errors'] = 'Todo cant be completed during creation'

    except Exception as e:
        resp['status'] = 400
        resp['message'] = 'exception occered'
        resp['exception'] = str(e)

    return Response(resp)


@api_view(['GET'])
def get_todos(request):
    resp = {'status': 200, 'message': 'Success'}
    try:
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        resp['data'] = serializer.data

    except Exception as e:
        resp['status'] = 400
        resp['message'] = 'Exception Occered'
        resp['exception'] = str(e)

    return Response(resp)


@api_view(['GET'])
def get_todo(request, pk):
    resp = {'status': 200, 'message': 'Success'}
    try:
        todos = Todo.objects.get(pk=pk)
        serializer = TodoSerializer(todos, many=False)
        resp['data'] = serializer.data

    except Exception as e:
        resp['status'] = 400
        resp['message'] = 'Exception Occered'
        resp['exception'] = str(e)

    return Response(resp)


@api_view(['PUT', 'PATCH'])
def update_todo(request):
    resp = {'status': 200, 'message': 'Success'}
    try:
        obj = Todo.objects.get(pk=request.data.get('id'))
        serializer = TodoSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            resp['data'] = serializer.data
        else:
            resp['status'] = 400
            resp['message'] = "Invalid data"
            resp['errors'] = serializer.errors

    except Exception as e:
        resp['status'] = 400
        resp['message'] = 'exception occered'
        resp['exception'] = str(e)

    return Response(resp)
