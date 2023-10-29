from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import action

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Todo, TodoDeadline
from .serializers import UserSerializer, TodoSerializer, TodoDeadlineSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import User

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .helper import send_login_otp
from django.core.cache import cache


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


@api_view(['POST'])
def signup(request):
    try:
        password = request.data.get('password')
        confirm_password = request.data.get('confirm-password')

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid() and password == confirm_password:
            serializer.save()

            user = User.objects.get(username=request.data.get('username'))
            user.set_password(request.data.get('password'))
            if request.data.get('is_staff', False):
                user.is_staff = True
            user.save()

            token = Token.objects.create(user=user)
            return Response({"token": token.key, "data": serializer.data}, status=status.HTTP_201_CREATED)

        return Response({"data": (serializer.errors if confirm_password == password else "Confirm Password doesn't match")}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"data": str(e)}, status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
def login(request):
    try:
        phone_number = request.data.get('phone_number')
        otp = str(request.data.get('otp'))

        user = User.objects.get(phone_number=phone_number)

        otp_cache_key = f'OTP_{user.phone_number}'

        otp_expire_in = cache.ttl(otp_cache_key)
        if otp_expire_in == 0:
            return Response({"data": "incorrent OTP entered"}, status=status.HTTP_404_NOT_FOUND)

        cached_otp = str(cache.get(otp_cache_key))
        if cached_otp != otp:
            return Response({"data": "incorrent OTP entered"}, status=status.HTTP_404_NOT_FOUND)

        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(user)
        return Response({"token": token.key, "data": serializer.data}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"data": str(e)}, status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_todo(request):
    try:
        serializer = TodoSerializer(data=request.data)

        if serializer.is_valid() and not request.data.get('is_completed', False):
            todo = serializer.save(user=request.user)
            return Response({'status': 200, 'message': 'success', 'data': serializer.data})

        error_message = ('Todo cannot be completed during creation' if request.data.get(
            'is_completed', False) else serializer.errors)
        return Response({'status': 400, 'message': 'Invalid data', 'errors': error_message})

    except Exception as e:
        return Response({'status': 400, 'message': 'Exception occurred', 'exception': str(e)})


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


@api_view(['GET'])
def get_todo(request, pk):
    resp = {'status': 200, 'message': 'success'}
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
    resp = {'status': 200, 'message': 'success'}
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


@api_view(['DELETE'])
def delete_todo(request):
    resp = {'status': 200, 'message': 'success'}
    try:
        obj = Todo.objects.get(pk=request.data.get('id'))
        obj.delete()

    except Exception as e:
        resp['status'] = 400
        resp['message'] = 'exception occered'
        resp['exception'] = str(e)

    return Response(resp)


class TodoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    resp = {'status': 200, 'message': 'success'}

    def reset(self):
        self.resp = {'status': 200, 'message': 'success'}

    def exception_occered(self, e):
        self.resp['status'] = 400
        self.resp['message'] = 'Exception Occered'
        self.resp['exception'] = str(e)

    def error_occered(self, exception):
        self.resp['status'] = 400
        self.resp['message'] = "Invalid data"
        self.resp['errors'] = exception

    def get(self, request):
        self.reset()
        try:
            if pk := request.data.get('id', None):
                todos = Todo.objects.get(pk=pk)
                serializer = TodoSerializer(todos, many=False)
            else:
                todos = Todo.objects.all()
                serializer = TodoSerializer(todos, many=True)
                self.resp['count'] = len(serializer.data)

            self.resp['data'] = serializer.data

        except Exception as e:
            self.exception_occered(e)
        return Response(self.resp)

    def post(self, request):
        self.reset()
        try:
            serializer = TodoSerializer(data=request.data)

            if serializer.is_valid() and not request.data.get('is_completed', False):
                serializer.save()
                self.resp['data'] = serializer.data
            else:
                self.error_occered(serializer.errors)
                if request.data.get('is_completed', False):
                    self.resp['errors'] = 'Todo cant be completed during creation'

        except Exception as e:
            self.exception_occered(e)
        return Response(self.resp)

    def patch(self, request):
        self.reset()
        try:
            obj = Todo.objects.get(pk=request.data.get('id'))
            serializer = TodoSerializer(obj, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()

                self.resp['data'] = serializer.data
            else:
                self.error_occered(serializer.errors)

        except Exception as e:
            self.exception_occered(e)

        return Response(self.resp)

    def delete(self, request):
        self.reset()
        try:
            obj = Todo.objects.get(pk=request.data.get('id'))
            obj.delete()

        except Exception as e:
            self.exception_occered(e)

        return Response(self.resp)


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    @action(detail=False, methods=['post'])
    def add_todo_deadline(self, request):
        try:
            data = request.data
            serializer = TodoDeadlineSerializer(data=data)
            if not serializer.is_valid():
                return Response({'status': 400, "message": "Invalid data",
                                 "exception": serializer.errors})
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            return Response({'status': 400, "message": "exception occered",
                             "exception": str(e)})

    @action(detail=False, methods=['post'])
    def get_todo_deadline(self, request):
        objs = TodoDeadline.objects.all()
        serializer = TodoDeadlineSerializer(objs, many=True)
        return Response(serializer.data)
