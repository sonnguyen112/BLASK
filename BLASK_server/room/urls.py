from django.urls import path
from .views import *
urlpatterns = [
    # path("api/get_quiz/<str:slug>/", get_quiz),
    path("api/create_room/<str:slug>", create_room),
    path("api/delete_room/<str:pin>", delete_room),
    path("api/join_room/<str:pin>", join_room),
]
