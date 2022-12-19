from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_profile")
    profile_pic = models.CharField(max_length=100, null=True) 
    token_for_reset_password = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username