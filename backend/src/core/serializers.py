from rest_framework import serializers
from core.models import Character


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        exclude = ('id',)


class CharacterOverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ('name', 'profession', 'group')
