from ast import Return
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from .serializer import TodoSerializer
@api_view(["GET"])
def quiz_one(resquest):
    return Response({
            'status' : "GET",
            'message' : 'Yes! Django rest framwork is working!!!!',
            'method_called' : 'You called GET method'
     })
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

@api_view(['POST'])
def post_todo(request):
    try: 
        data =request.data
        serializer = TodoSerializer(data = data)
        if serializer.is_valid():
            print(serializer.data)
            return Response({
                'status' : "True",
                'message' : 'Success quiz create',
                'data': serializer.data
            })
        return Response({
                'status' : "False",
                'message' : 'Fail quiz create',
                'data': serializer.data
            })
    except Exception as e:
        print(e)
    return Response({
            'status' : "False",
            'message' : 'Something went wrong'
            
        })   