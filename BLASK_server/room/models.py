from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Room(models.Model):
    pin = models.CharField(max_length = 10)
    host = models.ForeignKey(User, on_delete=models.CASCADE)