from django.db import models
from django.contrib.auth.models import User
from quiz.models import Quiz

# Create your models here.
class Room(models.Model):
    pin = models.CharField(max_length = 10)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)