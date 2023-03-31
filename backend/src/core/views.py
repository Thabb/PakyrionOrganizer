from django.contrib.auth import authenticate, login, logout

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User as PermissionUser
from core.models import Character
from core.serializers import CharacterSerializer, CharacterOverviewSerializer


@api_view(["POST"])
def register_user(request):
    username = request.data["username"]
    first_name = request.data["firstname"]
    last_name = request.data["lastname"]
    email = request.data["email"]
    password = request.data["password"]

    new_user = PermissionUser.objects.create_user(username=username, email=email, password=password)
    new_user.first_name = first_name
    new_user.last_name = last_name
    new_user.save()
    return Response()


@api_view(["POST"])
def log_in_user(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response(status=200)
    else:
        return Response(status=404)


@api_view(["POST"])
def log_out_user(request):
    logout(request)
    return Response(status=200)


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
