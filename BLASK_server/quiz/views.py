from ast import Return
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from .serializer import QuizSerializer
from .models import *
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

#create quiz 
@api_view(['POST'])
def create_quiz(request):
    try: 
        data =request.data
        serializer = QuizSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status' : "True",
                'message' : 'Success to create a quiz',
                'data': serializer.data
            })
        return Response({
                'status' : "False",
                'message' : 'Fail to create quiz',
                'data': serializer.errors
            })
    except Exception as e:
        print(e)
    return Response({
            'status' : "False",
            'message' : 'Something went wrong'
        })  
#get quiz 

@api_view(['GET'])
def get_all_quiz(request):
    quiz_objs = Quiz.objects.all()
    serializer = QuizSerializer(quiz_objs,many=True)
    return Response({
                'status' : "True",
                'message' : 'Access to get your quiz',
                'data': serializer.data
            })

#get_one_quiz
# @api_view(['GET'])
# def get_one_quiz(request):
#     try:
#         data = request.data
#         if not data.get('id'):
#             return Response({
#                 'status' : "False",
#                 'message' : 'The quiz is required',
#                 'data': {}
#             })
#         quiz_objs = Quiz.objects.get(id=data.get('id'))
#         serializer = QuizSerializer(quiz_objs,many=True)
#         return Response({
#             'status' : "True",
#             'message' : 'Access to get your quiz',
#             'data': serializer.data
#         })
#     except Exception as e:
#         print(e)
#     return Response({
#             'status' : "False",
#             'message' : 'Something went wrong'
#         })  


#update quiz 
def update_quiz(request):
    try:
        data = request.data
        if not data.get('id'):
            return Response({
                'status' : "False",
                'message' : 'The quiz is required',
                'data': {}
            })
        
        obj = Quiz.objects.get(id=data.get('id'))
        serializer = QuizSerializer(obj, data = data, partial = True)
        if serializer.is_valid():
            return Response({
                'status' : "True",
                'message' : 'Success to update the quiz',
                'data': serializer.data
            })
        return Response({
                'status' : "False",
                'message' : 'Fail to update the quiz',
                'data': serializer.errors
            })
    except Exception as e:
        print(e)
    return Response({
            'status' : "False",
            'message' : 'Something went wrong'
        })  
# delete_one_quiz  
@api_view(['DELETE'])
def delete_one_quiz(request):
    try:
        data = request.data
        if not data.get('id'):
            return Response({
                "can not find the id"
            })
        obj = Quiz.objects.get(id=data.get('id'))
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
# delete_all_quiz
@api_view(['DELETE'])
def delete_all_quiz(request):
    quiz_objs = Quiz.objects.all()
    quiz_objs.delete()
    return Response({
            'all quizs have alreadly been deleted'
        })
        