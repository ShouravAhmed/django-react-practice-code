from datetime import timedelta
from django.core.cache import cache
from django.utils.translation import gettext as _
from rest_framework import serializers
from .models import Todo, TodoDeadline
import re
from django.template.defaultfilters import slugify

from .models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['phone_number', 'full_name',
                  'address', 'email', 'points', 'date_joined', 'staff_level', 'is_staff']


class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['phone_number'] = user.phone_number
        return token

    phone_number = serializers.CharField(write_only=True)
    otp = serializers.CharField(write_only=True)

    def validate(self, attrs):
        phone_number = attrs.get('phone_number', None)
        otp = attrs.get('otp', None)

        if not phone_number or not otp:
            raise serializers.ValidationError(
                _("Phone number and OTP are required."), code='authorization')

        user = User.objects.filter(phone_number=phone_number).first()
        if not user:
            raise serializers.ValidationError(
                _("Phone number is not correct."), code='authorization')

        otp_cache_key = f'OTP_{phone_number}'
        cached_otp = cache.get(otp_cache_key, None)

        if (cached_otp != otp):
            raise serializers.ValidationError(
                _("OTP is not correct."), code='authorization')

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


class TodoSerializer(serializers.ModelSerializer):
    slug = serializers.SerializerMethodField()

    class Meta:
        model = Todo
        fields = '__all__'
        # fields = ['title', 'description', 'is_completed']
        # exclude = ['updated_at']

    def get_slug(self, obj):
        return slugify(obj.title)

    def validate_description(self, data):
        if "~" in data:
            raise serializers.ValidationError(
                "description cant contain ~")
        return data

    def validate(self, validated_data):
        if title := validated_data.get('title'):
            regex = re.compile('[0-9@#$^*()_+{}\[\];<>,.?~\\|]')
            if regex.search(title):
                raise serializers.ValidationError(
                    "Todo title can't contain spacial character.")
            if len(title) < 3:
                raise serializers.ValidationError("Todo title is too short.")

        if description := validated_data.get('description'):
            if len(description) > 100:
                raise serializers.ValidationError(
                    "Todo description is too large.")
        return validated_data


class TodoDeadlineSerializer(serializers.ModelSerializer):
    todo = TodoSerializer()

    class Meta:
        model = TodoDeadline
        fields = '__all__'
        # depth = 1
