from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.models import Character
from core.serializers import CharacterSerializer, CharacterOverviewSerializer


@api_view(["GET"])
def get_character_overview(_, user_id):
    character_overview_data = Character.objects.filter(user_id=user_id)
    response_data = CharacterOverviewSerializer(character_overview_data, many=True).data

    return Response(response_data)


@api_view(["GET"])
def get_character_list(_, user_id):
    character_list_data = Character.objects.filter(user_id=user_id)
    response_data = CharacterSerializer(character_list_data, many=True).data

    return Response(response_data)
