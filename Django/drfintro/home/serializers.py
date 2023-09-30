from rest_framework import serializers
from .models import Todo
import re
from django.template.defaultfilters import slugify


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
