import json

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .utils import check_answer


class WaitConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "room_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        name_player = text_data_json['name_player']
        avatar = text_data_json['avatar']
        type_action = text_data_json["type_action"]

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "wait_message", "name_player": name_player, "avatar": avatar,
                                   "type_action": type_action}
        )

    # Receive message from room group
    async def wait_message(self, event):
        name_player = event["name_player"]
        avatar = event["avatar"]
        type_action = event["type_action"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'name_player': name_player,
            'avatar': avatar,
            "type_action": type_action
        }))


class PlayConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "room_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        type_action = text_data_json["type_action"]
        if type_action == "answer":
            name_player = text_data_json['name_player']
            question_id = text_data_json['question_id']
            option_id_player_choose = text_data_json['option_id_player_choose']
            remaining_time = text_data_json['remaining_time']
            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name, {"type": "play_message", "name_player": name_player,
                                       "question_id": question_id, "option_id_player_choose": option_id_player_choose,
                                       "remaining_time": remaining_time,
                                       "type_action": type_action}
            )
        elif type_action == "score_board":
            # Send message to room group
            name_player = text_data_json['name_player']
            rank = text_data_json["rank"]
            score = text_data_json["score"]
            await self.channel_layer.group_send(
                self.room_group_name, {
                    "type": "play_message",
                    "type_action": type_action,
                    "rank": rank,
                    "score": score,
                    "name_player": name_player
                    }
            )
        elif type_action == "next":
            index_next_ques = text_data_json["index_next_ques"]
            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name, {
                    "type": "play_message",
                    "type_action": type_action,
                    "index_next_ques": index_next_ques
                    }
            )
        elif type_action == "delete":
            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name, {
                    "type": "play_message",
                    "type_action": type_action
                    }
            )
        elif type_action == "append":
            name_player = text_data_json['name_player']
            avatar = text_data_json["avatar"]
            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name, {
                    "type": "play_message",
                    "name_player": name_player,
                    "avatar" : avatar,
                    "type_action": type_action,
                    }
            )
        elif type_action == "timeout":
            name_player = text_data_json['name_player']
            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name, {
                    "type": "play_message",
                    "type_action": type_action,
                    "name_player": name_player,
                    }
            )


    # Receive message from room group
    async def play_message(self, event):
        type_action = event["type_action"]
        if type_action == "answer":
            name_player = event["name_player"]
            question_id = event["question_id"]
            option_id_player_choose = event["option_id_player_choose"]
            remaining_time = event["remaining_time"]
            is_true = await sync_to_async(check_answer)(question_id, option_id_player_choose)
            # Send message to WebSocket
            await self.send(text_data=json.dumps({
                "type_action": type_action,
                'name_player': name_player,
                "question_id": question_id,
                "is_true": is_true,
                "remaining_time": remaining_time
            }))
        elif type_action == "score_board":
            # Send message to WebSocket
            name_player = event["name_player"]
            rank = event["rank"]
            score = event["score"]
            await self.send(text_data=json.dumps({
                "type_action": type_action,
                "name_player": name_player,
                "rank": rank,
                "score": score
            }))
        elif type_action == "next":
            index_next_ques = event["index_next_ques"]
            # Send message to WebSocket
            await self.send(text_data=json.dumps({
                "type_action": type_action,
                "index_next_ques": index_next_ques
            }))
        elif type_action == "delete":
            # Send message to WebSocket
            await self.send(text_data=json.dumps({
                "type_action": type_action,
            }))
        elif type_action == "append":
            name_player = event["name_player"]
            avatar = event["avatar"]
            # Send message to WebSocket
            await self.send(text_data=json.dumps({
                "type_action": type_action,
                "name_player": name_player,
                "avatar": avatar
            }))
        elif type_action == "timeout":
            name_player = event["name_player"]
            await self.send(text_data=json.dumps({
                "type_action": type_action,
                "name_player": name_player,
            }))

