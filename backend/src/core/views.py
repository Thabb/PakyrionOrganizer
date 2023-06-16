from django.contrib.auth import authenticate, login, logout

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User as PermissionUser
from django.http import JsonResponse
from core.models import Character, UserData, Convention
from core.serializers import CharacterSerializer, CharacterOverviewSerializer, UserDataSerializer, ConventionSerializer, \
    ConventionOverviewSerializer


# --------------------------------------------------------------------------------------------------------
# Authentication APIs
# --------------------------------------------------------------------------------------------------------

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
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response(status=200)
    else:
        return Response(status=404)


@api_view(["POST"])
def log_out_user(request):
    logout(request)
    response = JsonResponse({'message': 'Logout erfolgreich'})
    response.delete_cookie('csrftoken')
    response.delete_cookie('sessionid')
    return response


@api_view(["GET"])
def get_current_user(request):
    return Response({'user': str(request.user)})


@api_view(["GET"])
def is_user_admin(request):
    print(request.user.is_staff)

    if request.user.is_staff:
        return Response({'is_admin': True})
    return Response({'is_admin': False})


# --------------------------------------------------------------------------------------------------------
# UserData APIs
# --------------------------------------------------------------------------------------------------------

@api_view(["GET"])
def get_user_data(request):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    user_data = UserData.objects.filter(user_id=request.user.id).first()
    response_data = UserDataSerializer(user_data).data

    return Response(response_data)


@api_view(["POST"])
def save_user_data(request):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    user_data = UserData.objects.filter(user_id=request.user.id)

    if user_data:
        # check if the character belongs to the user
        if user_data.first().user_id.id != request.user.id:
            return Response(status=403)

        user_data.update(**request.data)
    else:
        new_user_data = user_data.create(**request.data)
        new_user_data.user_id = request.user
        new_user_data.save()

    return Response(status=200)


# --------------------------------------------------------------------------------------------------------
# Character APIs
# --------------------------------------------------------------------------------------------------------

@api_view(["GET"])
def get_character_overview(request):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    character_overview_data = Character.objects.filter(user_id=request.user.id)
    response_data = CharacterOverviewSerializer(character_overview_data, many=True).data

    return Response(response_data)


@api_view(["GET"])
def get_character(request, character_id):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    character = Character.objects.get(pk=character_id)

    # check if the character belongs to the user
    if character.user_id.id == request.user.id:
        response_data = CharacterSerializer(character).data
        return Response(response_data)

    return Response(status=403)


@api_view(["POST"])
def save_character(request, character_id):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    character = Character.objects.filter(pk=character_id)

    # check if the character belongs to the user
    if character.first().user_id.id != request.user.id:
        return Response(status=403)

    if character:
        character.update(**request.data)
    else:
        return Response(status=404)

    return Response(status=200)


@api_view(["POST"])
def create_character(request):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    character_name = request.data["name"]

    serializer = CharacterSerializer(data={"user_id": request.user.id, "name": character_name})
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(status=404)

    return Response(status=200)


@api_view(["POST"])
def delete_character(request, character_id):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    character = Character.objects.filter(pk=character_id)

    # check if the character belongs to the user
    if character.first().user_id.id != request.user.id:
        return Response(status=403)

    if character:
        character.delete()
    else:
        return Response(status=404)

    return Response(status=200)


# --------------------------------------------------------------------------------------------------------
# Convention APIs
# --------------------------------------------------------------------------------------------------------#

@api_view(["GET"])
def get_convention_overview(request):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    # TODO: check if user is admin

    convention_overview_data = Convention.objects.all()
    response_data = ConventionOverviewSerializer(convention_overview_data, many=True).data

    return Response(response_data)


@api_view(["GET"])
def get_convention(request, convention_id):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    # TODO: check if user is admin

    convention = Convention.objects.get(pk=convention_id)

    response_data = ConventionSerializer(convention).data
    return Response(response_data)


@api_view(["POST"])
def save_convention(request, convention_id):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    # TODO: check if user is admin

    convention = Convention.objects.filter(pk=convention_id)

    if convention:
        convention.update(**request.data)
    else:
        return Response(status=404)

    return Response(status=200)


@api_view(["POST"])
def create_convention(request):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    # TODO: check if user is admin

    convention_name = request.data["name"]

    serializer = ConventionSerializer(data={"name": convention_name})
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(status=404)

    return Response(status=200)


@api_view(["POST"])
def delete_convention(request, convention_id):
    # check if user is authenticated and session is not expired
    if not request.user.is_authenticated or not request.session.session_key:
        return Response(status=403)

    # TODO: check if user is admin

    convention = Convention.objects.filter(pk=convention_id)

    if convention:
        convention.delete()
    else:
        return Response(status=404)

    return Response(status=200)
