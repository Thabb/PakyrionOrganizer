from django.db import models


class User(models.Model):
    name = models.CharField(max_length=255)


class Character(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=0)

    name = models.CharField(max_length=255, default="")
    group = models.CharField(max_length=255, default="")
    profession = models.CharField(max_length=255, default="")
    faith = models.CharField(max_length=255, default="")
    age = models.CharField(max_length=255, default="")
    family = models.CharField(max_length=255, default="")
