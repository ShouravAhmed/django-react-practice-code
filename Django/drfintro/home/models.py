from django.db import models
from django.urls import reverse
import uuid


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, editable=False,
                          unique=True, default=uuid.uuid4())
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        abstract = True


class Todo(BaseModel):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-updated_at', 'created_at']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("todo_detail", kwargs={"pk": self.pk})
