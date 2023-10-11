# Generated by Django 4.1 on 2023-10-01 10:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('home', '0004_alter_todo_id_tododeadline'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='todo',
            name='id',
            field=models.UUIDField(default=uuid.UUID('ccd1d7a4-418c-4aa5-a685-677350b1a8ba'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='tododeadline',
            name='id',
            field=models.UUIDField(default=uuid.UUID('ccd1d7a4-418c-4aa5-a685-677350b1a8ba'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]