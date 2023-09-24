from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

@login_required(login_url='login')
def home(request):
    context = {
        'page_name' : "Home",
    }
    return render(request, 'exam_app/home.html', context=context)
