from rest_framework import serializers
from core.models import Character, UserData, Convention, ConventionSignUp


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


class ConventionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convention
        exclude = ('id',)


class ConventionOverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convention
        fields = ('id', 'name')


class ConventionSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConventionSignUp
        exclude = ('id',)
