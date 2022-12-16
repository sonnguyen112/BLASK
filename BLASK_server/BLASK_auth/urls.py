from django.urls import path
from . import views
from rest_framework.authtoken import views as token_views

urlpatterns = [
    path("api/sign_up", views.sign_up),
    path("api/sign_in", views.sign_in),
    path("api/sign_out", views.sign_out),
]