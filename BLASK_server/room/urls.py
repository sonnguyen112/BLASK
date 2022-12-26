from django.urls import path
from .views import *
urlpatterns = [
    path("api/get_quiz/<str:slug>/", get_quiz),
    path("api/create_room/", create_room),
    path("api/delete_room/<str:pin>/", delete_room),
]