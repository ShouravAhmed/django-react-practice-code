from .enums import StaffLevel
from django.db import models
from django.urls import reverse
import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager


class User(AbstractUser):
    id = models.CharField(max_length=15, default="")
    phone_number = models.CharField(
        max_length=15, unique=True, primary_key=True)
    full_name = models.CharField(max_length=73, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    total_purchase = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    visit_count = models.IntegerField(default=0)

    staff_level = models.IntegerField(
        choices=StaffLevel.choices, default=StaffLevel.USER)

    date_joined = models.DateTimeField(auto_now_add=True, editable=False)

    is_phone_verified = models.BooleanField(default=False)
    username = models.CharField(
        max_length=30, unique=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.id = self.phone_number
        super(User, self).save(*args, **kwargs)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['full_name', 'email']
    objects = UserManager()


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
