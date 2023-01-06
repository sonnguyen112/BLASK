from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/wait/(?P<room_name>\w+)/$", consumers.WaitConsumer.as_asgi()),
    # re_path(r"ws/play/(?P<room_name>\w+)/$", consumers.PlayConsumer.as_asgi()),
]
