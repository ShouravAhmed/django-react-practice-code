# Generated by Django 4.1 on 2023-09-28 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('uid', models.UUIDField(default=models.UUIDField(default='uuid-ossp'), editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('updated_at', models.DateField(auto_now=True)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('is_completed', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-updated_at', 'created_at'],
            },
        ),
    ]