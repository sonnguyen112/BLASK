from rest_framework.response import Response
from .serializer import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.decorators import parser_classes

# QUIZ############################################################################################################################################################################################################################################

# CREATE QUIZ
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser,JSONParser])
def create_quiz(request):
    try:
        data = request.data
        dataQuiz = {
            'title': data['title'], 'description': data['description'], 'userOf': request.user.id}
        serializerQuiz = QuizSerializer(data=dataQuiz)
        if serializerQuiz.is_valid():
            serializerQuiz.save()
        else:
            return Response({
                'status': "False",
                'message': 'Fail to create quiz at Quiz',
            })
        if 'questions' in data:
            dataQuestionArray = data['questions']
            for i in range(len(dataQuestionArray)):
                dataSubQuestion = {
                    'numberOfAnswer': dataQuestionArray[i]['num_of_answer'],
                    'quizOf': serializerQuiz.data['id'],
                    'score': dataQuestionArray[i]['point'],
                    'numOfSecond': dataQuestionArray[i]['time'],
                    # 'image':dataQuestionArray[i]['image']
                    'image':'data:image/jpeg;base64,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'

                }
                serializerQuestion = QuestionSerializer(data=dataSubQuestion)
                if serializerQuestion.is_valid():
                    serializerQuestion.save()
                else:
                    return Response({
                        'status': "False",
                        'message': 'Fail to create quiz at Question',
                        'error':serializerQuestion.errors
                    })
                if 'options' in dataQuestionArray[i]:
                    dataOptionArray = dataQuestionArray[i]['options']
                    for j in range(len(dataOptionArray)):
                        dataSubOption = {
                            'content': dataOptionArray[j]['content'],
                            'isTrue': dataOptionArray[j]['is_true'],
                            'questionOf': serializerQuestion.data['id'],
                            # 'image':dataOptionArray[i]['image']

                        }
                        serializerOption = OptionSerializer(data=dataSubOption)
                        if serializerOption.is_valid():
                            serializerOption.save()
                        else:

                            return Response({
                                'status': "False",
                                'message': 'Fail to create quiz at Option',
                               
                            })
        return Response({
                        'status': "True",
                        'message': 'Success to create quiz',
                        })
    except Exception as e:
        print(e)
        return Response({
            'status': "False",
            'message': str(e)
        })

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
                    'image': j.image,
                    'isTrue': j.isTrue
                })
            listQuestion.append({
                'id': i.id,
                'description': i.description,
                'score': i.score,
                'numOfSecond': i.numOfSecond,
                'numberOfAnswer': i.numberOfAnswer,
                'image': i.image,
                'options': listOption
                
            })
        return Response({
            "id": quizObj.id,
            "title": quizObj.title,
            "description": quizObj.description,
            "username": userObj.username,
            "questions": listQuestion
        })

    except Exception as e:
        print(e)
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
            },
                status=status.HTTP_404_NOT_FOUND
            )
        data = request.data
        if 'title' in data:
            dataQuiz = {
                'title': data['title'], 'description': data['description'], 'userOf': request.user.id}
        else:
            dataQuiz = {
                'description': data['description'], 'userOf': request.user.id}
        objQuiz = Quiz.objects.get(id=id)
        serializerQuiz = QuizSerializer(objQuiz, data=dataQuiz, partial=True)
        if serializerQuiz.is_valid():
            serializerQuiz.save()
        else:
            return Response({
                'status': "False",
                'message': 'Fail to create quiz',
            })
        if 'questions' in data:
            dataQuestionArray = data['questions']
            for i in range(len(dataQuestionArray)):
                dataSubQuestion = {
                    'numberOfAnswer': dataQuestionArray[i]['num_of_answer'],
                    'quizOf': serializerQuiz.data['id'],
                    'score': dataQuestionArray[i]['point'],
                    'numOfSecond': dataQuestionArray[i]['time']
                }
            objQuestion = Question.objects.get(id=serializerQuiz.data['id'])
            serializerQuestion = QuestionSerializer(
                objQuestion, data=dataSubQuestion, partial=True)
            if serializerQuestion.is_valid():
                serializerQuestion.save()
            else:
                return Response({
                    'status': "False",
                    'message': 'Fail to update quiz',
                })
            if 'options' in dataQuestionArray[i]:
                dataOptionArray = dataQuestionArray[i]['options']
                for j in range(len(dataOptionArray)):
                    dataSubOption = {
                        'content': dataOptionArray[j]['content'],
                        'isTrue': dataOptionArray[j]['is_true'],
                        'questionOf': serializerQuestion.data['id']
                    }
                    objOption = Option.objects.get(
                        id=serializerQuestion.data['id'])
                    serializerOption = OptionSerializer(data=dataSubOption)
                    if serializerOption.is_valid():
                        serializerOption.save()
                    else:
                        return Response({
                            'status': "False",
                            'message': 'Fail to update quiz',
                        })
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

