from django.urls import path
from . import views
from .views import *
urlpatterns = [
    path("api/hello", views.hello),
    path("", views.quiz),
    path("create-quiz/", create_quiz,name="create_quiz"),
    path("get-all-quiz/", get_all_quiz, name="get_all_quiz"),
    path("get-one-quiz/<int:id>/", get_one_quiz, name="get_one_quiz"),
    path("update-quiz/<int:id>/", update_quiz, name="update_quiz"),
    path("delete-one-quiz/<int:id>/",delete_one_quiz,name="delete_one_quiz"),
    path("delete-all-quiz/", delete_all_quiz, name="delete_all_quiz"),
]

