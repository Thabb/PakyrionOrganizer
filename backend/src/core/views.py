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
def get_character(_, character_id):
    character_data = Character.objects.get(pk=character_id)
    response_data = CharacterSerializer(character_data).data

    return Response(response_data)


@api_view(["POST"])
def save_character(request, character_id):
    character = Character.objects.filter(pk=character_id)
    if character:
        character.update(**request.data)
    else:
        return Response(status=404)

    return Response(status=200)


@api_view(["POST"])
def create_character(request):
    character_name = request.data["name"]
    user_id = request.data["user_id"]

    serializer = CharacterSerializer(data={"user_id": user_id, "name": character_name})
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(status=404)

    return Response(status=200)


@api_view(["POST"])
def delete_character(_, character_id):
    character = Character.objects.filter(pk=character_id)
    if character:
        character.delete()
    else:
        return Response(status=404)

    return Response(status=200)
