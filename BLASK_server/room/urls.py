from django.urls import path
from .views import *
urlpatterns = [
    path("api/get_quiz/<str:slug>/", get_quiz),
]