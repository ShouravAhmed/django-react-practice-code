from django.shortcuts import render, redirect
from .models import *
import json

from django.http import HttpResponse
from django.contrib.auth.decorators import login_required


def save_recipe(data, files):
    recipe_id = data["recipe_id"]
    if recipe_id != "":
        recipe_id = int(recipe_id)

    recipe_name = data['name'].title()
    recipe_description = data['description']
    recipe_image = files.get('image')

    recipe = Recipe.objects.filter(id=(recipe_id if recipe_id != "" else -1))
    if len(recipe) > 0:
        recipe = recipe[0]
        recipe.name = recipe_name
        recipe.description = recipe_description
        if recipe_image:
            recipe.image = recipe_image
    else:
        recipeDB = {
            "name": recipe_name,
            "description": recipe_description,
            "image": recipe_image
        }
        recipe = Recipe.objects.create(**recipeDB)

    idx = 1
    deleted = 0
    while f"step_title_{idx}" in data:
        step_title = data[f"step_title_{idx}"].title()
        step_description = data[f"step_description_{idx}"]
        step_ingredients = data[f"step_ingredients_{idx}"]

        recipe_step = Step.objects.filter(stepId=idx, recipe=recipe)

        if len(step_title.strip()) > 0:
            if len(recipe_step) > 0:
                recipe_step = recipe_step[0]
                recipe_step.stepId = idx - deleted
                recipe_step.title = step_title
                recipe_step.description = step_description
                recipe_step.ingredients.clear()
            else:
                stepDB = {
                    "stepId": idx - deleted,
                    "title": step_title,
                    "description": step_description,
                    "recipe": recipe

                }
                recipe_step = Step.objects.create(**stepDB)

            for x in step_ingredients.split(','):
                if len(x.strip().title()) > 0:
                    ingredient = Ingredient.objects.filter(
                        name=x.strip().title())
                    if len(ingredient) > 0:
                        ingredient = ingredient[0]
                    else:
                        ingredient = Ingredient.objects.create(
                            name=x.strip().title())
                    recipe_step.ingredients.add(ingredient)

            recipe_step.save()
        else:
            recipe_step.delete()
            deleted += 1

        idx += 1
    recipe.save()
    return recipe.id


@login_required(login_url='login')
def create_recipe(request):
    if request.method == "POST":
        recipe_id = save_recipe(request.POST, request.FILES)
        return redirect('recipe', recipe_id=recipe_id)

    context = {
        "page": "Secrect Recipe | Add Recipes",
        "operation": "create"
    }
    return render(request, 'receipe/create_receipe.html', context=context)


@login_required(login_url='login')
def home(request):
    search_text = request.GET.get(
        'search') if request.GET.get('search') else ""
    recipes = []
    allRecipes = Recipe.objects.filter(name__icontains=search_text)
    for recipe in allRecipes:
        saveRecipe = {
            "Id": str(recipe.id),
            "Name": recipe.name.title(),
            "Description": recipe.description,
            "Image": recipe.image.url if recipe.image else '',
            "Steps": [],
            "Ingredients": []
        }
        steps = Step.objects.filter(recipe=recipe)

        for step in steps:
            saveStep = {
                "Title": step.title.title(),
                "Description": step.description,
                "Ingredients": [x.name for x in step.ingredients.all()]
            }
            saveRecipe["Steps"].append(saveStep)

            saveRecipe["Ingredients"].extend(saveStep["Ingredients"])

        recipes.append(saveRecipe)

    context = {
        "page": "Secrect Recipe",
        "recipes": recipes,
        "search_text": search_text
    }
    return render(request, 'receipe/index.html', context=context)


@login_required(login_url='login')
def recipe(request, recipe_id):
    recipeDB = Recipe.objects.filter(id=int(recipe_id))[0]

    recipe = {
        "Id": str(recipeDB.id),
        "Name": recipeDB.name,
        "Description": recipeDB.description,
        "Image": recipeDB.image.url if recipeDB.image else '',
        "Steps": [],
        "Ingredients": []
    }
    steps = Step.objects.filter(recipe=recipeDB)
    for step in steps:
        saveStep = {
            "Title": step.title,
            "Descriptions": [x.strip() for x in step.description.split('\n') if x.strip() != ""],
            "Ingredients": [x.name for x in step.ingredients.all()]
        }
        recipe["Steps"].append(saveStep)
        recipe["Ingredients"].extend(saveStep["Ingredients"])

    context = {
        "page": f"Secrect Recipe | {recipeDB.name}",
        "recipe": recipe
    }
    return render(request, 'receipe/recipe.html', context=context)


@login_required(login_url='login')
def update_recipe(request, recipe_id):
    if request.method == "POST":
        save_recipe(request.POST, request.FILES)
        return redirect('recipe', recipe_id=recipe_id)

    recipeDB = Recipe.objects.filter(id=int(recipe_id))[0]

    recipe = {
        "Id": str(recipe_id),
        "Name": recipeDB.name,
        "Description": recipeDB.description,
        "Image": recipeDB.image.url if recipeDB.image else '',
        "Steps": [],
        "Ingredients": []
    }
    steps = Step.objects.filter(recipe=recipeDB)
    for step in steps:
        saveStep = {
            "Title": step.title,
            "Descriptions": step.description,
            "Ingredients": [x.name for x in step.ingredients.all()]
        }
        recipe["Steps"].append(saveStep)
        recipe["Ingredients"].extend(saveStep["Ingredients"])

    context = {
        "page": "Secrect Recipe | Update Recipes",
        "operation": "update",
        "recipe": recipe
    }
    return render(request, 'receipe/create_receipe.html', context=context)


@login_required(login_url='login')
def delete_recipe(request, recipe_id):
    recipeDB = Recipe.objects.filter(id=int(recipe_id))[0]
    recipeDB.delete()
    return redirect('home')
