 //=================================
 // Django
 //=================================
 python3.10 -m venv .venv
 source .venv/bin/activate
 deactivate

 python3.10 -m pip install --upgrade pip
 pip3.10 install -r requirements.txt
 

 python manage.py makemigrations
 python manage.py migrate
 python manage.py runserver

 python manage.py createsuperuser

 pip install djangorestframework-simplejw
 pip install django-cors-headers
 
 pip freeze > requirements.txt
 //=================================


 
 //=================================
 // React
 //=================================
 sudo npm install -g n
 sudo n latest
 node --version

 npx create-react-app frontend
 npm install react-router-dom
 npm start

 npm install axios
 //=================================

