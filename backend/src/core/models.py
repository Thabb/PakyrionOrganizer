from django.db import models
from django.contrib.auth.models import User as PermissionUser


class Character(models.Model):
    user_id = models.ForeignKey(PermissionUser, on_delete=models.CASCADE, default=1)  # TODO: ACTUAL DEFAULT USER

    name = models.CharField(max_length=255, default="")
    group = models.CharField(max_length=255, default="")
    profession = models.CharField(max_length=255, default="")
    faith = models.CharField(max_length=255, default="")
    age = models.CharField(max_length=255, default="")
    family = models.CharField(max_length=255, default="")


class UserData(models.Model):
    user_id = models.ForeignKey(PermissionUser, on_delete=models.CASCADE, default=1)  # TODO: ACTUAL DEFAULT USER

    first_name = models.CharField(max_length=255, default="")
    last_name = models.CharField(max_length=255, default="")
    birth_date = models.DateField()
    allergies = models.CharField(max_length=1023, default="")
