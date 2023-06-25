import datetime

from django.db import models
from django.contrib.auth.models import User as PermissionUser


class Character(models.Model):
    user_id = models.ForeignKey(PermissionUser, on_delete=models.CASCADE, default=1)  # TODO: ACTUAL DEFAULT USER

    name = models.CharField(max_length=255, default="")
    title = models.CharField(max_length=255, default="")
    profession = models.CharField(max_length=255, default="")
    group = models.CharField(max_length=255, default="")
    character_class = models.CharField(max_length=255, default="")
    specialized = models.BooleanField(default=False)
    con_days = models.IntegerField(default=0)
    species = models.CharField(max_length=255, default="")
    faith = models.CharField(max_length=255, default="")
    alignment = models.CharField(max_length=255, default="")


class UserData(models.Model):
    user_id = models.ForeignKey(PermissionUser, on_delete=models.CASCADE, default=1)  # TODO: ACTUAL DEFAULT USER

    first_name = models.CharField(max_length=255, default="")
    last_name = models.CharField(max_length=255, default="")
    street = models.CharField(max_length=255, default="")
    zipcode = models.IntegerField(default=0)
    city = models.CharField(max_length=255, default="")
    telephone = models.CharField(max_length=255, default="")
    mobile = models.CharField(max_length=255, default="")
    birth_date = models.DateField(null=True, blank=True)
    con_days = models.IntegerField(default=0)
    sicknesses = models.CharField(max_length=1023, default="")
    allergies = models.CharField(max_length=1023, default="")
    vegetarian = models.BooleanField(default=False)
    vegan = models.BooleanField(default=False)
    privacy_information = models.BooleanField(default=False)
    privacy_photos = models.BooleanField(default=False)


class Convention(models.Model):
    name = models.CharField(max_length=511, default="")


class ConventionSignUp(models.Model):
    convention = models.ForeignKey(Convention, on_delete=models.CASCADE, default=1)  # TODO: ACTUAL DEFAULT CONVENTION
    user = models.ForeignKey(PermissionUser, on_delete=models.CASCADE, default=1)  # TODO: ACTUAL DEFAULT USER
    characters = models.CharField(max_length=511, default="")
    status = models.BooleanField(default=False)
