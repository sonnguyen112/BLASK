from tkinter import TRUE
from django.db import models
from django.contrib.auth.models import User
import uuid
# Create your models here.
class Quiz(models.Model):
    createAt = models.DateTimeField(auto_now_add = True)
    updateAt = models.DateTimeField(auto_now = True)
    title = models.CharField(max_length=100, null = True)#null
    description = models.TextField(null = True, blank = True)
    userOf = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class Question(models.Model):
    description = models.TextField(null = True, blank = True)
    time = models.TimeField()
    image = models.FileField(upload_to= "QuestionImage", blank = True)
    score = models.IntegerField()
    quizOf = models.ForeignKey(Quiz, on_delete=models.CASCADE, null = True )
    numberOfAnswer= models.IntegerField(default = 0)

class Option(models.Model):
    content =  models.TextField(null = True, blank = True)
    image = models.FileField(upload_to= "OptionImage", blank = True)
    questionOf = models.ForeignKey(Question, on_delete=models.CASCADE, null= True )
    isTrue = models.BooleanField(default=False)

