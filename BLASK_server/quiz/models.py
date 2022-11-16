from django.db import models
from django.contrib.auth.models import User
from drf_extra_fields.fields import Base64ImageField

# Create your models here.
class Quiz(models.Model):
    createAt = models.DateTimeField(auto_now_add = True)
    updateAt = models.DateTimeField(auto_now = True)
    title = models.CharField(max_length=100, default = "defautTitle")
    description = models.TextField(null = True, blank = True)
    userOf = models.ForeignKey(User, on_delete=models.CASCADE)
    
class Question(models.Model):
    description = models.TextField(null = True, blank = True)
    numOfSecond = models.IntegerField(default=10)
    image = models.ImageField(upload_to= "QuestionImage", blank = True, null = True)
    score = models.IntegerField()
    quizOf = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    numberOfAnswer= models.IntegerField(default = 1)

class Option(models.Model):
    content =  models.TextField(null = True, blank = True)
    image = models.FileField(upload_to= "OptionImage", blank = True, null = True)
    questionOf = models.ForeignKey(Question, on_delete=models.CASCADE)
    isTrue = models.BooleanField(default=False)

class TestImage(models.Model):
    img = Base64ImageField()