from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from quiz.models import *
from .dtos import *
import random
from .models import *
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz(request, slug):
    try:
        quiz = Quiz.objects.get(slug=slug)
        list_question = Question.objects.filter(quizOf=quiz)
        list_option = []
        for question in list_question:
            options = Option.objects.filter(questionOf=question)
            for option in options:
                list_option.append(option)
        dto = GetQuizDTO(quiz, list_question, list_option)
        return Response(vars(dto), status = status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def create_room(request):
    try:
        pin = str(random.randint(100000, 999999))
        while Room.objects.filter(pin = pin).exists():
            pin = str(random.randint(100000, 999999))
        room = Room.objects.create(pin = pin, host = request.user)
        room.save()
        dto = CreateRoomDTO(room)
        return Response(vars(dto), status = status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_room(request, pin):
    try:
        room = Room.objects.get(pin = pin)
        room.delete()
        return Response(
            {
                "message": 'the room has alreadly been deleted'
            },
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)