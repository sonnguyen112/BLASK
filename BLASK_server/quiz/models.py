from tkinter import TRUE
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Quiz(models.Model):
    createAt = models.DateTimeField(auto_now_add = True)
    updateAt = models.DateTimeField(auto_now = True)
    User = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        abstract = True

class Todo(Quiz):
    todo_title = models.CharField(max_length=100)
    todo_description = models.TextField()