from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status

# Create your views here.
@api_view(["POST"])
def sign_up(request):
    username = request.data.get('username')
    password = request.data.get('password')
    confirm_password = request.data.get('password_confirm')
    email = request.data.get('email')
    if password == confirm_password:
        if User.objects.filter(username=username).exists():
            return Response({
                "message" : "Username already exists",
            }, status=status.HTTP_409_CONFLICT)
        elif User.objects.filter(email=email).exists():
            return Response({
                "message" : "Email already exists",
            }, status=status.HTTP_409_CONFLICT)
        else:
            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()
            return Response({
                "message" : "User created successfully",
            }, status=status.HTTP_201_CREATED)
    else:
        return Response({
                "message" : "Password and confirm password do not match",
            }, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def sign_out(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)
