from django.urls import path
from . import views
from .views import *
urlpatterns = [
    path("", views.quiz),
    path("create-quiz/", create_quiz,name="create_quiz"),
    path("get-all-quiz/", get_all_quiz, name="get_all_quiz"),
    # path("get-one-quiz/", get_one_quiz, name="get_one_quiz"),
    path("update-quiz/", update_quiz, name="update_quiz"),
    path("delete-quiz/",delete_one_quiz,name="delete_one_quiz"),
    path("delete-all-quiz/", delete_all_quiz, name="delete_all_quiz")

]