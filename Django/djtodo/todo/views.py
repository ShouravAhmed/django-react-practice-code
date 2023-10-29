from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import status

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from django.core.cache import cache

from .helper import send_login_otp
from .models import User, Todo
from .serializers import TodoSerializer


# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def api_routes(requests):
    routes = [
        'api/get-todos/',

        'api/token/',
        'api/token/refresh/',
    ]
    return Response(routes)


@api_view(['POST'])
def send_otp(request):
    try:
        if 'phone_number' not in request.data:
            return Response({"data": "phone number required."}, status=status.HTTP_404_NOT_FOUND)

        phone_number = request.data.get('phone_number')
        user, created = User.objects.get_or_create(phone_number=phone_number)

        message = send_login_otp(phone_number)

        return Response(
            {'data': message},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response({"data": "exception occered", "exception": str(e)}, status=status.HTTP_404_NOT_FOUND)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_todos(request):
    resp = {'status': 200, 'message': 'success'}
    try:
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        resp['count'] = len(serializer.data)
        resp['data'] = serializer.data

    except Exception as e:
        resp['status'] = 400
        resp['message'] = 'Exception Occered'
        resp['exception'] = str(e)

    return Response(resp)
