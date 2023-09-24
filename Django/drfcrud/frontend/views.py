from django.shortcuts import render


def todos(request):
    context = {
        'page_name' : 'To Do : Home',
    }
    return render(request, "frontend/index.html", context=context)
