from rest_framework.response import Response
from .serializer import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import uuid
from project_utils.common import decode_base64
from .dtos import *

# QUIZ############################################################################################################################################################################################################################################

# CREATE QUIZ


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_quiz(request):
    try:
        data = request.data

        if "imageQuizUrl" in data:
            base64_img = data["imageQuizUrl"]
            quiz_img_url = decode_base64(base64_img)
        else:
            quiz_img_url = f"http://localhost:8000/media/default.jpg"

        dataQuiz = {
            'title': data['title'],
            'description': data['description'],
            'userOf': request.user.id,
            'imageQuizUrl': quiz_img_url,
            'slug' : data['title'].replace(" ", "-") + str(uuid.uuid4())
        }

        serializerQuiz = QuizSerializer(data=dataQuiz)
        if serializerQuiz.is_valid():
            serializerQuiz.save()
        else:
            return Response({
                'message': 'Fail to create quiz because requese invalid',
            }, status=status.HTTP_400_BAD_REQUEST)

        dataQuestionArray = data['questions']
        for i in range(len(dataQuestionArray)):

            if "imageQuestionUrl" in dataQuestionArray[i]:
                base64_img = dataQuestionArray[i]["imageQuestionUrl"]
                quiz_img_url = decode_base64(base64_img)
            else:
                question_img_url = f"http://localhost:8000/media/default.jpg"

            dataSubQuestion = {
                'description': dataQuestionArray[i]['name'],
                'quizOf': serializerQuiz.data['id'],
                'score': dataQuestionArray[i]['point'],
                'numOfSecond': dataQuestionArray[i]['time'],
                'imageQuestionUrl': question_img_url
            }
            serializerQuestion = QuestionSerializer(data=dataSubQuestion)
            if serializerQuestion.is_valid():
                serializerQuestion.save()
            else:
                return Response({
                    'message': 'Fail to create quiz because requese invalid',
                }, status=status.HTTP_400_BAD_REQUEST)

            dataOptionArray = dataQuestionArray[i]['options']
            for j in range(len(dataOptionArray)):

                if "imageOptionUrl" in dataOptionArray[j]:
                    base64_img = dataOptionArray[j]["imageQuestionUrl"]
                    quiz_img_url = decode_base64(base64_img)
                else:
                    option_img_url = f"http://localhost:8000/media/default.jpg"

                dataSubOption = {
                    'content': dataOptionArray[j]['content'],
                    'isTrue': dataOptionArray[j]['is_true'],
                    'questionOf': serializerQuestion.data['id'],
                    'imageOptionUrl': option_img_url
                }

                serializerOption = OptionSerializer(data=dataSubOption)
                if serializerOption.is_valid():
                    serializerOption.save()
                else:
                    return Response({
                        'message': 'Fail to create quiz because requese invalid',
                    }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "message": "Created Quiz Successfully",
            "id": serializerQuiz.data["id"]
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

# GET ALL QUIZ


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_quiz(request):
    quiz_objs = Quiz.objects.filter(userOf=request.user.id)
    serializer = QuizSerializer(quiz_objs, many=True)
    dto = GetAllQuizDTO(serializer.data)
    return Response(vars(dto), status=status.HTTP_200_OK)


# GET ONE QUIZ
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_one_quiz(request, slug):
    try:
        quiz = Quiz.objects.get(slug=slug)
        list_question = Question.objects.filter(quizOf=quiz)
        list_option = []
        for question in list_question:
            options = Option.objects.filter(questionOf=question)
            for option in options:
                list_option.append(option)
        dto = GetOneQuizDTO(quiz, list_question, list_option)
        return Response(vars(dto), status = status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

# UPDATE QUIZ
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_quiz(request, slug):
    try:
        data = request.data

        if "imageQuizUrl" in data:
            base64_img = data["imageQuizUrl"]
            quiz_img_url = decode_base64(base64_img)
        else:
            quiz_img_url = f"http://localhost:8000/media/default.jpg"

        dataQuiz = {
            'title': data['title'],
            'description': data['description'],
            'userOf': request.user.id,
            'imageQuizUrl': quiz_img_url,
            'slug' : data['title'].replace(" ", "-") + str(uuid.uuid4())
        }
        objQuiz = Quiz.objects.get(slug=slug)
        serializerQuiz = QuizSerializer(objQuiz, data=dataQuiz, partial=True)
        if serializerQuiz.is_valid():
            serializerQuiz.save()
        else:
            return Response({
                'message': 'Fail to update quiz',
            }, status=status.HTTP_400_BAD_REQUEST)
        dataQuestionArray = data['questions']

        question_objs = Question.objects.filter(
            quizOf=serializerQuiz.data['id'])
        i = 0
        for question_obj in question_objs:
            if "imageQuestionUrl" in dataQuestionArray[i]:
                base64_img = dataQuestionArray[i]["imageQuestionUrl"]
                quiz_img_url = decode_base64(base64_img)
            else:
                question_img_url = f"http://localhost:8000/media/default.jpg"

            dataSubQuestion = {
                'description': dataQuestionArray[i]['name'],
                'quizOf': serializerQuiz.data['id'],
                'score': dataQuestionArray[i]['point'],
                'numOfSecond': dataQuestionArray[i]['time'],
                "imgQuestionUrl": question_img_url
            }
            serializerQuestion = QuestionSerializer(
                question_obj, data=dataSubQuestion, partial=True)
            if serializerQuestion.is_valid():
                serializerQuestion.save()
            else:
                return Response({
                    'message': 'Fail to update question in Quiz',
                }, status=status.HTTP_400_BAD_REQUEST)

            dataOptionArray = dataQuestionArray[i]['options']
            option_objs = Option.objects.filter(
                questionOf=serializerQuestion.data["id"])
            j = 0
            for option_obj in option_objs:
                if "imageOptionUrl" in dataOptionArray[j]:
                    base64_img = dataOptionArray[j]["imageQuestionUrl"]
                    quiz_img_url = decode_base64(base64_img)
                else:
                    option_img_url = f"http://localhost:8000/media/default.jpg"
                dataSubOption = {
                    'content': dataOptionArray[j]['content'],
                    'isTrue': dataOptionArray[j]['is_true'],
                    'questionOf': serializerQuestion.data['id'],
                    "imageOptionUrl": option_img_url
                }
                serializerOption = OptionSerializer(
                    option_obj, data=dataSubOption, partial=True)
                if serializerOption.is_valid():
                    serializerOption.save()
                else:
                    return Response({
                        'message': 'Fail to update option in Quiz',
                    }, status=status.HTTP_400_BAD_REQUEST)
                j += 1
            i += 1
        return Response({
                          'message': 'Success to update quiz',
                        }, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)


# DELETE ONE QUIZ
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_one_quiz(request, slug):
    try:
        obj = Quiz.objects.get(slug=slug)
        obj.delete()
        return Response(
            {
                "message": 'the quiz has alreadly been deleted'
            },
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)


# DELETE ALL QUIZS
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_all_quiz(request):
    quiz_objs = Quiz.objects.all()
    quiz_objs.delete()
    return Response(
        {
            "message": "all quizs have alreadly been deleted"
        },
        status=status.HTTP_200_OK
    )
