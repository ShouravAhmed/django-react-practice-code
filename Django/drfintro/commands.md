 //=================================
 // Django
 //=================================
 python3.10 -m venv .venv
 source .venv/bin/activate
 deactivate

 python3.10 -m pip install --upgrade pip
 pip3.10 install -r requirements.txt
 
 python manage.py startapp app_name

 python manage.py makemigrations
 python manage.py migrate
 python manage.py runserver

 python manage.py createsuperuser

 pip install djangorestframework-simplejw
 pip install django-cors-headers
 
 pip freeze > requirements.txt
 //=================================
