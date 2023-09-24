from django.db import models
from django.contrib.auth.models import User


class Recipe(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to="recipesImage")
    total_view = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ['name']


class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              upload_to="ingredientsImage")

    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ['name']


class Step(models.Model):
    stepId = models.IntegerField()
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name='steps')
    ingredients = models.ManyToManyField(Ingredient, related_name='steps')

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['stepId']
