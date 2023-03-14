from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.models import Character
from core.serializers import CharacterSerializer


@api_view(["GET"])
def get_character(_, user_id):
    character_data = Character.objects.filter(user_id=user_id)
    response_data = CharacterSerializer(character_data, many=True).data

    return Response(response_data)

