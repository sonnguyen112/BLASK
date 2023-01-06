from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from .models import UserProfile
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .dtos import SignInDTO
import re

# Create your views here.


@api_view(["POST"])
def sign_up(request):
    first_name = request.data.get('firstname')
    last_name = request.data.get('lastname')
    username = request.data.get('username')
    password = request.data.get('password')
    confirm_password = request.data.get('password_confirm')
    email = request.data.get('email')

    regex_email = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

    if re.fullmatch(regex_email, email) == None:
        return Response({
            "message": "Email is invalid",
        }, status=status.HTTP_400_BAD_REQUEST)

    regex_pass = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
    pat = re.compile(regex_pass)

    if re.search(pat, password) == None:
        return Response({
            "message": "Password is invalid",
        }, status=status.HTTP_400_BAD_REQUEST)

    if password == confirm_password:
        if User.objects.filter(username=username).exists():
            return Response({
                "message": "Username already exists",
            }, status=status.HTTP_409_CONFLICT)
        elif User.objects.filter(email=email).exists():
            return Response({
                "message": "Email already exists",
            }, status=status.HTTP_409_CONFLICT)
        else:
            user = User.objects.create_user(
                username=username, password=password, email=email)
            user.save()

            user_profile = UserProfile.objects.create(
                first_name=first_name, last_name=last_name, user=user, profile_pic="http://localhost:8000/media/default.jpg")
            user_profile.save()
            return Response({
                "message": "User created successfully",
            }, status=status.HTTP_201_CREATED)
    else:
        return Response({
            "message": "Password and confirm password do not match",
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def sign_in(request):
    try:
        data = request.data
        user = authenticate(
            request, username=data["username"], password=data["password"])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            user_profile = UserProfile.objects.get(user=user)
            dto = SignInDTO(token, user, user_profile)
            return Response(vars(dto), status=status.HTTP_200_OK)
        else:
            return Response({
            "message": "Username or password is invalid",
            }, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({
            "message": str(e),
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def sign_out(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)
