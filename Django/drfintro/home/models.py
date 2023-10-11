from django.db import models
from django.urls import reverse
import uuid

from django.contrib.auth.models import User


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, editable=False,
                          unique=True, default=uuid.uuid4())
    created_at = models.DateField(auto_now_add=True, editable=False)
    updated_at = models.DateField(auto_now=True, editable=False)

    class Meta:
        abstract = True


class Todo(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-updated_at', 'created_at']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("todo_detail", kwargs={"pk": self.pk})


class TodoDeadline(BaseModel):
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE)
    deadline = models.DateTimeField()
