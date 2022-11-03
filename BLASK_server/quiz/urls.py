from django.urls import path
from . import views
from .views import *
urlpatterns = [
    path("", views.quiz),
    path("post-todo/", post_todo,name="post_todo")
]