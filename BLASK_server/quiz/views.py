from rest_framework.response import Response 
from .serializer import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

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
@permission_classes([IsAuthenticated])
def create_quiz(request):
    try: 
        data =request.data
        data["userOf"] = request.user.id
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
@permission_classes([IsAuthenticated])
def get_all_quiz(request):
    quiz_objs = Quiz.objects.all()
    serializer = QuizSerializer(quiz_objs)
    return Response({
                'status' : "True",
                'message' : 'Access to get your quiz',
                'data': serializer.data
            })



#get_one_quiz
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
        quiz_objs = Quiz.objects.get( id = id)
        serializer = QuizSerializer(quiz_objs,many=False)
        return Response({
        'status' : "True",
        'message' : "Access to get your quiz",
        'data': serializer.data
        })
    except Exception as e:
        print(e)
        return Response({
            'status' : "False",
            'message' : 'Something went wrong'
        })  



#update quiz 
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_quiz(request,id):
    try:
        data = request.data
        obj = Quiz.objects.get(id=id)
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
# delete_all_quiz


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_all_quiz(request):
    quiz_objs = Quiz.objects.all()
    quiz_objs.delete()
    return Response({
            'all quizs have alreadly been deleted'
        })
        
# # QUESTION ***********************************************************************************************************************************************************
# # CREATE QUESTION
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_question(request):
#     try: 
#             data =request.data
#             serializer = QuestionSerializer(data = data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({
#                     'status' : "True",
#                     'message' : 'Success to create a question',
#                     'data': serializer.data 
#                 })
#             return Response({
#                     'status' : "False",
#                     'message' : 'Fail to create a question',
#                     'data': serializer.errors
#                 })
#     except Exception as e:
#             print(e)
#             return Response({
#                 'status' : "False",
#                 'message' : 'Something went wrong'
#             })


# # GET ALL QUESTION
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_all_question(request):
#     question_objs = Question.objects.all()
#     serializer = QuestionSerializer(question_objs,many=True)
#     return Response({
#                 'status' : "True",
#                 'message' : 'Access to get all question',
#                 'data': serializer.data
#             })
    

# # GET ONE QUESTION 

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_one_question(request,id):
#     try:
#         if not id:
#             return Response({
#                 'status' : "False",
#                 'message' : 'The question is required',
#                 'data': {}
#             })
#         question_objs = Question.objects.get( id = id)
#         serializer = QuizSerializer(question_objs,many=False)
#         return Response({
#         'status' : "True",
#         'message' : "Access to get your question",
#         'data': serializer.data
#         })
#     except Exception as e:
#         print(e)
#         return Response({
#             'status' : "False",
#             'message' : 'Something went wrong'
#         })  



# # UPDATE QUESTION
# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_question(request,id):
#     try:
#         data = request.data
#         obj = Question.objects.get(id=id)
#         serializer = QuestionSerializer(obj, data = data, partial = True)
#         if serializer.is_valid():
#             return Response({
#                 'status' : "True",
#                 'message' : 'Success to update the quiz',
#                 'data': serializer.data
#             })
#         return Response({
#                 'status' : "False",
#                 'message' : 'Fail to update the quiz',
#                 'data': serializer.errors
#             })
#     except Exception as e:
#         print(e)
#         return Response({
#             'status' : "False",
#             'message' : 'Something went wrong'
#         })  


# #DELETE ONE QUESTION
# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_one_question(request,id):
#     try:
#         data = request.data
#         if not id:
#             return Response({
#                 "can not find the id"
#             })
#         obj = Question.objects.get(id=id)
#         obj.delete()
#         return Response({
#             'the question has alreadly been deleted'
#         })
#     except Exception as e:
#         print(e)
#     return Response({
#             'status' : "False",
#             'message' : 'Something went wrong'
#         })


# #DELETE ALL QUESTION
# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_all_question(request):
#     question_objs = Question.objects.all()
#     question_objs.delete()
#     return Response({
#             'all questions have alreadly been deleted'
#         })


# # OPTION***********************************************************************************************************************************************
# #CREATE OPTION
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_option(request):
#     try: 
#             data =request.data
#             serializer = OptionSerializer(data = data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({
#                     'status' : "True",
#                     'message' : 'Success to create a option',
#                     'data': serializer.data 
#                 })
#             return Response({
#                     'status' : "False",
#                     'message' : 'Fail to create a option',
#                     'data': serializer.errors
#                 })
#     except Exception as e:
#             print(e)
#             return Response({
#                 'status' : "False",
#                 'message' : 'Something went wrong'
#             })

# #UPDATE OPTION
# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_question(request,id):
#     try:
#         data = request.data
#         obj = Question.objects.get(id=id)
#         serializer = QuestionSerializer(obj, data = data, partial = True)
#         if serializer.is_valid():
#             return Response({
#                 'status' : "True",
#                 'message' : 'Success to update the quiz',
#                 'data': serializer.data
#             })
#         return Response({
#                 'status' : "False",
#                 'message' : 'Fail to update the quiz',
#                 'data': serializer.errors
#             })
#     except Exception as e:
#         print(e)
#         return Response({
#             'status' : "False",
#             'message' : 'Something went wrong'
#         })  

# #GET ONE OPTION
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_one_option(request,id):
#     try:
#         if not id:
#             return Response({
#                 'status' : "False",
#                 'message' : 'The option is required',
#                 'data': {}
#             })
#         option_objs = Option.objects.get( id = id)
#         serializer = OptionSerializer(option_objs,many=False)
#         return Response({
#         'status' : "True",
#         'message' : "Access to get your question",
#         'data': serializer.data
#         })
#     except Exception as e:
#         print(e)
#         return Response({
#             'status' : "False",
#             'message' : 'Something went wrong'
#         })  

# #DELETE ONe OPTION
# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_one_question(request,id):
#     try:
#         data = request.data
#         if not id:
#             return Response({
#                 "can not find the id"
#             })
#         obj = Question.objects.get(id=id)
#         obj.delete()
#         return Response({
#             'the question has alreadly been deleted'
#         })
#     except Exception as e:
#         print(e)
#     return Response({
#             'status' : "False",
#             'message' : 'Something went wrong'
#         })
# # Create your views here





@api_view(["GET"])
@permission_classes([IsAuthenticated])
def hello(request):
    return Response({
        "message" : "Hello BLASK"
    })


