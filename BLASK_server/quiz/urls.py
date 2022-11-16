from django.urls import path
from . import views
from .views import *
urlpatterns = [
    path("create_quiz/", create_quiz,name="create_quiz"),
    path("get_all_quiz/", get_all_quiz, name="get_all_quiz"),
    path("get_one_quiz/<int:id>/", get_one_quiz, name="get_one_quiz"),
    path("update_quiz/<int:id>/", update_quiz, name="update_quiz"),
    path("delete_one_quiz/<int:id>/",delete_one_quiz,name="delete_one_quiz"),
    path("delete_all_quiz/", delete_all_quiz, name="delete_all_quiz"),
]

