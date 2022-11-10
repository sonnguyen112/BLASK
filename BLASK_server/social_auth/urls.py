from django.urls import path
from . import views

urlpatterns = [
    path("api/sign_in_google", views.sign_in_google),
   
]