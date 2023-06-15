from rest_framework import serializers
from core.models import Character, UserData


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        exclude = ('id',)


class CharacterOverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ('id', 'name', 'profession', 'group')


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        exclude = ('id',)
