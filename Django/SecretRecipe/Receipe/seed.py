from .models import *
from django.contrib.auth.models import User
import random
from faker import Faker
import time


def seed_db(user_cnt) -> None:
    start_time = time.time()
    fake = Faker()

    for _ in range(user_cnt):
        try:
            phone_no = f"1{random.randint(3, 9)}"
            for _ in range(8):
                phone_no = phone_no + str(random.randint(0, 9))
            email = fake.email()

            if not User.objects.filter(username=phone_no).exists():
                user = User.objects.create(
                    email=email,
                    username=phone_no
                )
                user.set_password("12345678")
                user.save()

                recipe_cnt = random.randint(5, 13)
                for _ in range(recipe_cnt):
                    try:
                        recipeDB = {
                            "user": user,
                            "name": fake.word(),
                            "description": fake.sentence(),
                            "image": fake.image_url()
                        }
                        recipe = Recipe.objects.create(**recipeDB)

                        step = random.randint(5, 10)
                        for i in range(step):
                            try:
                                stepDB = {
                                    "stepId": i + 1,
                                    "title": fake.sentence(),
                                    "description": fake.paragraph(),
                                    "recipe": recipe
                                }
                                recipe_step = Step.objects.create(**stepDB)

                                ingrd_cnt = random.randint(3, 6)
                                for _ in range(ingrd_cnt):
                                    try:
                                        ingrd_name = fake.word()
                                        ingredient = Ingredient.objects.filter(
                                            name=ingrd_name)
                                        if len(ingredient) > 0:
                                            ingredient = ingredient[0]
                                        else:
                                            ingredient = Ingredient.objects.create(
                                                name=ingrd_name)
                                        recipe_step.ingredients.add(ingredient)
                                    except Exception as e:
                                        print(e)

                                recipe_step.save()
                            except Exception as e:
                                print(e)

                        recipe.save()

                    except Exception as e:
                        print(e)

        except Exception as e:
            print(e)

    total_time = time.time() - start_time
    print("Total time:", total_time, "seconds")
