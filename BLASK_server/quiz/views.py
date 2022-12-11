from rest_framework.response import Response
from .serializer import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import logging
import base64
from PIL import Image
from io import BytesIO
import uuid
from project_utils.common import decode_base64

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
            'imageQuizUrl' : quiz_img_url
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
                'numberOfAnswer': dataQuestionArray[i]['num_of_answer'],
                'quizOf': serializerQuiz.data['id'],
                'score': dataQuestionArray[i]['point'],
                'numOfSecond': dataQuestionArray[i]['time'],
                'imageQuestionUrl' : question_img_url
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
                    'imageOptionUrl' : option_img_url
                }

                serializerOption = OptionSerializer(data=dataSubOption)
                if serializerOption.is_valid():
                    serializerOption.save()
                else:
                    return Response({
                        'message': 'Fail to create quiz because requese invalid',
                    }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "message" : "Created Quiz Successfully",
            "id" : serializerQuiz.data["id"]
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
    userObj = User.objects.get(id=request.user.id)
    serializer = QuizSerializer(quiz_objs, many=True)
    return Response({
        'status': "True",
        'message': 'Access to get your quiz',
        'username': userObj.username,
        'data': serializer.data
    })


# GET ONE QUIZ
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_one_quiz(request, id):
    try:
        if not id:
            return Response({
                "message": "can not find the id"
            },
                status=status.HTTP_404_NOT_FOUND
            )
        userObj = User.objects.get(id=request.user.id)
        quizObj = Quiz.objects.get(id=id)
        objQuestion = Question.objects.filter(quizOf=id)
        listQuestion = []
        for i in objQuestion:
            objOption = Option.objects.filter(questionOf=i.id)
            listOption = []
            for j in objOption:
                listOption.append({
                    'id': j.id,
                    'content': j.content,
                    'image': j.imageOptionUrl,
                    'isTrue': j.isTrue
                })
            listQuestion.append({
                'id': i.id,
                'description': i.description,
                'score': i.score,
                'numOfSecond': i.numOfSecond,
                'numberOfAnswer': i.numberOfAnswer,
                'image': i.imageQuestionUrl,
                'options': listOption
                
            })
        return Response({
            "id": quizObj.id,
            "title": quizObj.title,
            "description": quizObj.description,
            "username": userObj.username,
            "image" : quizObj.imageQuizUrl,
            "questions": listQuestion
        })

    except Exception as e:
        return Response({
            "data": "something wrong",
            "erros": str(e)
        })


# UPDATE QUIZ
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_quiz(request, id):
    try:
        if not id:
            return Response({
                "message": "can not find the id"
            },status=status.HTTP_404_NOT_FOUND)
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
            'imageQuizUrl' : quiz_img_url
        }
        objQuiz = Quiz.objects.get(id=id)
        serializerQuiz = QuizSerializer(objQuiz, data=dataQuiz, partial=True)
        if serializerQuiz.is_valid():
            serializerQuiz.save()
        else:
            return Response({
                'message': 'Fail to update quiz',
            }, status=status.HTTP_400_BAD_REQUEST)
        dataQuestionArray = data['questions']
            
        question_objs = Question.objects.filter(quizOf=serializerQuiz.data['id'])
        i = 0
        for question_obj in question_objs:
            if "imageQuestionUrl" in dataQuestionArray[i]:
                base64_img = dataQuestionArray[i]["imageQuestionUrl"]
                quiz_img_url = decode_base64(base64_img)
            else:
                question_img_url = f"http://localhost:8000/media/default.jpg"

            dataSubQuestion = {
                'numberOfAnswer': dataQuestionArray[i]['num_of_answer'],
                'quizOf': serializerQuiz.data['id'],
                'score': dataQuestionArray[i]['point'],
                'numOfSecond': dataQuestionArray[i]['time'],
                "imgQuestionUrl" : question_img_url
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
            option_objs = Option.objects.filter(questionOf =serializerQuestion.data["id"])
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
                    "imageOptionUrl" : option_img_url
                }
                serializerOption = OptionSerializer(option_obj,data=dataSubOption, partial=True)
                if serializerOption.is_valid():
                    serializerOption.save()
                else:
                    return Response({
                        'message': 'Fail to update option in Quiz',
                    }, status=status.HTTP_400_BAD_REQUEST)
                j += 1
            i += 1
        return Response({
                        'status': "True",
                        'message': 'Success to update quiz',
                        })
    except Exception as e:
        print(e)
        return Response({
            'status': "False",
            'message': str(e)
        })


# DELETE ONE QUIZ
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_one_quiz(request, id):
    try:
        data = request.data
        if not id:
            return Response({
                "message": "can not find the id"
            },
                status=status.HTTP_404_NOT_FOUND
            )
        obj = Quiz.objects.get(id=id)
        obj.delete()
        return Response(
            {
                "message": 'the quiz has alreadly been deleted'
            },
            status=status.HTTP_200_OK
        )
    except Exception as e:
        print(e)
    return Response({
        'status': "False",
        'message': 'Something went wrong'
    })


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

