from rest_framework.response import Response 
from .serializer import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core import serializers
from django.http import JsonResponse
@api_view(["GET","POST","PUT","DELETE"])
def quiz(request):
    if request.method == 'GET':
        return Response({
            'status' : "GET",
            'message' : 'Yes! Django rest framwork is working!!!!',
            'method_called' : 'You called GET method'
     })
    elif request.method == 'POST':
        return Response({
            'status' : "POST",
            'message' : 'Yes! Django rest framwork is working!!!!',
            'method_called' : 'You called POST method'
        })
    elif request.method == 'PUT':
        return Response({
            'status' : "PUT",
            'message' : 'Yes! Django rest framwork is working!!!!',
            'method_called' : 'You called PUT method'
        })
    else :
        return Response({
            'status' : "DELETE",
            'message' : 'Yes! Django rest framwork is working!!!!',
            'method_called' : 'You called DELETE method'
        })


#QUIZ############################################################################################################################################################################################################################################

#CREATE QUIZ
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_quiz(request):
    try: 
        data =request.data
        dataQuiz = {'title':data['title'],'description':data['description'],'userOf':request.user.id}
        serializerQuiz = QuizSerializer(data = dataQuiz)
        if serializerQuiz.is_valid():
            serializerQuiz.save()
        else:
            return Response({
                        'status' : "False",
                        'message' : 'Fail to create quiz at Quiz',
                    })
        if 'questions' in data:
            dataQuestionArray = data['questions']
            for i in range(len(dataQuestionArray)):
                dataSubQuestion = {
                    'numberOfAnswer':dataQuestionArray[i]['num_of_answer'],
                    'quizOf':serializerQuiz.data['id'],
                    'score':dataQuestionArray[i]['point'],
                    'numOfSecond': dataQuestionArray[i]['time']
                }
                serializerQuestion=QuestionSerializer(data=dataSubQuestion)   
                if serializerQuestion.is_valid():
                    serializerQuestion.save()
                else:
                    return Response({
                                'status' : "False",
                                'message' : 'Fail to create quiz at Question',
                            })
                if 'options' in dataQuestionArray[i]:
                    dataOptionArray =dataQuestionArray[i]['options']
                    for j in range(len(dataOptionArray)):
                        dataSubOption = {
                            'content' : dataOptionArray[j]['content'],
                            'isTrue' : dataOptionArray[j]['is_true'],
                            'questionOf' : serializerQuestion.data['id']
                        }   
                        serializerOption = OptionSerializer (data = dataSubOption)
                        if serializerOption.is_valid():
                            serializerOption.save()
                        else:
                            return Response({
                                        'status' : "False",
                                        'message' : 'Fail to create quiz at Option',
                                    })
        return Response({
                        'status' : "True",
                        'message' : 'Success to create quiz',
                    })
    except Exception as e:
        print(e)
        return Response({
            'status' : "False",
            'message' : str(e)
        })  

#GET ALL QUIZ
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_quiz(request):
        quiz_objs = Quiz.objects.filter(userOf= request.user.id)
        userObj = User.objects.get(id = request.user.id)
        serializer = QuizSerializer(quiz_objs,many = True)
        return Response({
                    'status' : "True",
                    'message' : 'Access to get your quiz',
                    'username': userObj.username,
                    'data': serializer.data
                })

    



#GET ONE QUIZ
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_one_quiz(request,id):
    try:
        if not id:
            return Response({
                'status' : "False",
                'message' : 'The quiz is required',
                'data': {}
            })
        userObj = User.objects.get(id = request.user.id)
        quizObj = Quiz.objects.get(id = id )
        objQuestion = Question.objects.filter(quizOf=id)
        listQuestion = []
        for i in objQuestion:
            objOption=Option.objects.filter(questionOf=i.id)
            listOption = []
            for j in objOption :
                listOption.append({
                    'id' : j.id,
                    'content' : j.content,
                    'isTrue' : j.isTrue
                })
            listQuestion.append({
                'id' : i.id,
                'description' : i.description,
                'score' : i.score,
                'numOfSecond' : i.numOfSecond,
                'numberOfAnswer': i.numberOfAnswer,
                'options': listOption
            })
        return Response({
            "id" : quizObj.id,
            "title" : quizObj.title,
            "description" : quizObj.description,
            "username" : userObj.username,
            "questions":listQuestion
            })  
      
        
        

    except Exception as e:
        print(e)
        return Response({
           "data" : "hello",
           "erros" : str(e)
        })  



#UPDATE QUIZ
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_quiz(request,id):
    try:
        if not id:
            return Response({
                'status' : "False",
                'message' : 'The quiz is required',
                'data': {}
            })
        data = request.data
        if 'title' in data:
            dataQuiz = {'title':data['title'],'description':data['description'],'userOf':request.user.id}
        else :
            dataQuiz = {'description':data['description'],'userOf':request.user.id}
        objQuiz = Quiz.objects.get(id=id)
        serializerQuiz = QuizSerializer(objQuiz, data = dataQuiz, partial = True)
        if serializerQuiz.is_valid():
            serializerQuiz.save()
        else:
            return Response({
                        'status' : "False",
                        'message' : 'Fail to create quiz',
                    })
        if 'questions' in data:
            dataQuestionArray = data['questions']
            for i in range(len(dataQuestionArray)):
                dataSubQuestion = {
                    'numberOfAnswer':dataQuestionArray[i]['num_of_answer'],
                    'quizOf':serializerQuiz.data['id'],
                    'score':dataQuestionArray[i]['point'],
                    'numOfSecond': dataQuestionArray[i]['time']
                }
            objQuestion = Question.objects.get(id=serializerQuiz.data['id'])
            serializerQuestion=QuestionSerializer(objQuestion,data=dataSubQuestion, partial = True)
            if serializerQuestion.is_valid():
                serializerQuestion.save()
            else:
                return Response({
                            'status' : "False",
                            'message' : 'Fail to update quiz',
                        })
            if 'options' in dataQuestionArray[i]:
                dataOptionArray =dataQuestionArray[i]['options']
                for j in range(len(dataOptionArray)):
                    dataSubOption = {
                        'content' : dataOptionArray[j]['content'],
                        'isTrue' : dataOptionArray[j]['is_true'],
                        'questionOf' : serializerQuestion.data['id']
                    }   
                    objOption = Option.objects.get(id=serializerQuestion.data['id'])
                    serializerOption = OptionSerializer (data = dataSubOption)
                    if serializerOption.is_valid():
                        serializerOption.save()
                    else:
                        return Response({
                                'status' : "False",
                                'message' : 'Fail to update quiz',
                            })
        return Response({
                        'status' : "True",
                        'message' : 'Success to update quiz',
                    })
    except Exception as e:
            print(e)
            return Response({
                'status' : "False",
                'message' : str(e)
            })  
    # try:
    #     if not id:
    #         return Response({
    #             'status' : "False",
    #             'message' : 'The quiz is required',
    #             'data': {}
    #         })
    #     data = request.data
    #     obj = Quiz.objects.get(id=id)
    #     serializer = QuizSerializer(obj, data = data, partial = True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({
    #             'status' : "True",
    #             'message' : 'Success to update the quiz',
    #             'data': serializer.data
    #         })
    #     return Response({
    #             'status' : "False",
    #             'message' : 'Fail to update the quiz',
    #             'data': serializer.errors
    #         })
    # except Exception as e:
    #     print(e)
    #     return Response({
    #         'status' : "False",
    #         'message' : str(e)
    #     })  




# DELETE ONE QUIZ 
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_one_quiz(request,id):
    try:
        data = request.data
        if not id:
            return Response({
                "can not find the id"
            })
        obj = Quiz.objects.get(id=id)
        obj.delete()
        return Response({
            'the quiz has alreadly been deleted'
        })
    except Exception as e:
        print(e)
    return Response({
            'status' : "False",
            'message' : 'Something went wrong'
        })




# DELETE ALL QUIZS
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_all_quiz(request):
    quiz_objs = Quiz.objects.all()
    quiz_objs.delete()
    return Response({
            'all quizs have alreadly been deleted'
        })
    


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def hello(request):
    return Response({
        "message" : "Hello BLASK"
    })



    





   
