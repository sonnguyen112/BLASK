from tkinter import TRUE
from django.db import models
from django.contrib.auth.models import User
import uuid
# Create your models here.
class Quiz(models.Model):
    createAt = models.DateTimeField(auto_now_add = True)
    updateAt = models.DateTimeField(auto_now = True)
    # User = models.ForeignKey(User, on_delete=models.CASCADE)

class Question(models.Model):
    type = models.CharField(max_length=100)
    description = models.TextField()
    time = models.TimeField()
    # image = models.ImageField()
    score = models.IntegerField()
    quizId = models.ForeignKey(Quiz, on_delete=models.CASCADE )

class Option(models.Model):
    content =  models.TextField()
    # image = models.ImageField()
    questionId = models.ForeignKey(Question, on_delete=models.CASCADE )


