import json

from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .utils import check_answer


class WaitConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "room_%s" % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        name_player = text_data_json['name_player']
        avatar = text_data_json['avatar']
        is_start = text_data_json['is_start']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "wait_message", "name_player": name_player, "avatar": avatar,
                                   "is_start": is_start}
        )

    # Receive message from room group
    def wait_message(self, event):
        name_player = event["name_player"]
        avatar = event["avatar"]
        is_start = event["is_start"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'name_player': name_player,
            'avatar': avatar,
            "is_start" : is_start
        }))

class PlayConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "room_%s" % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        name_player = text_data_json['name_player']
        question_id = text_data_json['question_id']
        option_id_player_choose = text_data_json['option_id_player_choose']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "play_message", "name_player": name_player,
                                   "question_id": question_id, "option_id_player_choose": option_id_player_choose}
        )

    # Receive message from room group
    def play_message(self, event):
        name_player = event["name_player"]
        question_id = event["question_id"]
        option_id_player_choose = event["option_id_player_choose"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'name_player': name_player,
            "question_id": question_id,
            "is_true": check_answer(question_id, option_id_player_choose)
        }))
