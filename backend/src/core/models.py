from django.db import models


class User(models.Model):
    name = models.CharField(max_length=255)


class Character(models.Model):
    name = models.CharField(max_length=255)
    group = models.CharField(max_length=255)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
