from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

@api_view(["GET"])
def sign_in_google(request):
    return Response({
        "Hello": "World"
    })
