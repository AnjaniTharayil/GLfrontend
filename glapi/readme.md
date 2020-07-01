1) create environment
   virtualenv env -p python3
   source envpath/bin/activate
2) pip install -r requirement.txt
3) python3 manage.py makemigrations
4) python3 manage.py migrate
5)python manage.py createsuperuser
6) python3 manage.py runserver
