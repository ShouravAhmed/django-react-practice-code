from django.shortcuts import render, redirect
from django.contrib.auth.models import User
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


def invalid_phone_no(num):
    num = str(num)
    operator = '345677777777777777777777777777777777777777777777777777777777777777777777754-789'
    if num.isdigit():
        if len(num) < 10:
            return True
        if len(num) == 10:
            return not num.startswith('1') or num[1] not in operator
        if len(num) == 11:
            return not num.startswith('01') or num[2] not in operator
        if len(num) == 13:
            return not num.startswith('8801') or num[4] not in operator
    if len(num) == 14:
        return not num.startswith('+8801') or num[5] not in operator or not num[1:].isdigit()
    return True


def weak_password(password):
    for i in password:
        if i.isalpha() or i.isdigit():
            continue
        if i not in "@._":
            return True
    return len(password) < 8


def login_page(request):
    context = {
        "page": "Secrect Recipe | Login",
    }
    if request.method == "POST":
        phone_no = request.POST.get("phone_no")
        phone_no = phone_no[-10:]
        password = request.POST.get("password")

        if invalid_phone_no(phone_no):
            context["warning"] = "Invalid phone no entered, please try again."
        elif user := authenticate(username=phone_no, password=password):
            login(request, user)
            return redirect('home')
        else:
            context["warning"] = "Phone no or password is not correct, please try again."
    return render(request, "accounts/login.html", context=context)


def register(request):
    context = {
        "page": "Secrect Recipe | Register",
        "registration": "registration"
    }
    if request.method == "POST":
        phone_no = request.POST.get("phone_no")
        email = request.POST.get("email") if "email" in request.POST else ""
        password = request.POST.get("password")
        confirm_password = request.POST.get(
            "confirm_password") if "confirm_password" in request.POST else ""

    7     if invalid_phone_no(phone_no):
            context["warning"] = "Invalid phone no entered, please try again."
        elif password != confirm_password:
            context["warning"] = "Password didn't matched, please try again."
        elif weak_password(password):
            context["warning"] = "Password Should only contain letter, number and special characters '@ . _'. Length of at least 8 and no space."
        elif User.objects.filter(username=phone_no).exists():
            context["warning"] = "Already registered, please login."
        else:
            return confirm_registration(phone_no, email, password, request)
    return render(request, "accounts/login.html", context=context)


def confirm_registration(phone_no, email, password, request):
    phone_no = phone_no[-10:]
    user = User.objects.create(
        email=email,
        username=phone_no
    )
    user.set_password(password)
    user.save()

    login(request, authenticate(username=phone_no, password=password))
    return redirect('home')


@login_required(login_url='login')
def logout_page(request):
    logout(request)
    return redirect('login')
