from django.db import models


class User(models.Model):
    name = models.CharField(max_length=255)


class Character(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=0)

    name = models.CharField(max_length=255)
    group = models.CharField(max_length=255)
    profession = models.CharField(max_length=255)
    faith = models.CharField(max_length=255)
    age = models.CharField(max_length=255)
    family = models.CharField(max_length=255)
