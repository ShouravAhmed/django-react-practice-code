from django.db import models
from datetime import datetime


class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False, blank=True, null=True)
    date = models.CharField(
        max_length=20, default=datetime.now().strftime('%d %B %Y'))

    def __str__(self):
        return self.title
