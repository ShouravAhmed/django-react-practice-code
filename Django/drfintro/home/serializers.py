from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        # fields = '__all__'
        # fields = ['title', 'description', 'is_completed']
        exclude = ['updated_at']
