
from django.db import models

from django.contrib.auth.models import AbstractUser
from .manager import UserManager
from .enums import StaffLevel


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

    created_at = models.DateField(auto_now_add=True, editable=False)
    updated_at = models.DateField(auto_now=True, editable=False)

    is_phone_verified = models.BooleanField(default=False)
    username = models.CharField(max_length=30, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.id = self.phone_number
        super(User, self).save(*args, **kwargs)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['full_name', 'email']
    objects = UserManager()


class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateField(auto_now_add=True, editable=False)
    updated_at = models.DateField(auto_now=True, editable=False)

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    deadline = models.DateTimeField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-updated_at', 'created_at']

    def __str__(self):
        return self.title
