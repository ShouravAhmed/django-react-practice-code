# Generated by Django 4.1 on 2023-09-23 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crudapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='date',
            field=models.CharField(default='23 September 2023', max_length=20),
        ),
    ]
