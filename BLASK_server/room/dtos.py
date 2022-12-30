from rest_framework.authtoken.models import Token


# class GetQuizDTO():
#     def __init__(self, quiz, list_question, list_option) -> None:
#         self.title = quiz.title
#         self.description = quiz.description
#         self.imageQuizUrl = quiz.imageQuizUrl
#         self.list_question = self.parse_list_question(list_question)
#         self.list_option = self.parse_list_option(list_option)

#     def parse_list_question(self, list_question):
#         parse_list_question = []
#         for question in list_question:
#             parse_list_question.append({
#                 "id": question.id,
#                 "description": question.description,
#                 "num_of_second": question.numOfSecond,
#                 "image_question_url": question.imageQuestionUrl,
#                 "score": question.score
#             })
#         return parse_list_question

#     def parse_list_option(self, list_option):
#         parse_list_option = []
#         for option in list_option:
#             parse_list_option.append({
#                 "id": option.id,
#                 "question": option.questionOf.id,
#                 "content": option.content,
#                 "image_option_url": option.imageOptionUrl
#             })
#         return parse_list_option


class CreateRoomDTO():
    def __init__(self, room, list_question, list_option) -> None:
        self.pin = room.pin
        self.token_host = Token.objects.get(user=room.host).key
        self.list_question = self.parse_list_question(list_question)
        self.list_option = self.parse_list_option(list_option)

    def parse_list_question(self, list_question):
        parse_list_question = []
        for question in list_question:
            parse_list_question.append({
                "id": question.id,
                "description": question.description,
                "num_of_second": question.numOfSecond,
                "image_question_url": question.imageQuestionUrl,
                "score": question.score
            })
        return parse_list_question

    def parse_list_option(self, list_option):
        parse_list_option = []
        for option in list_option:
            parse_list_option.append({
                "id": option.id,
                "question": option.questionOf.id,
                "content": option.content,
                "image_option_url": option.imageOptionUrl
            })
        return parse_list_option


class JoinRoomDTO():
    def __init__(self, room, list_question, list_option) -> None:
        self.token_host = Token.objects.get(user=room.host).key
        self.list_question = self.parse_list_question(list_question)
        self.list_option = self.parse_list_option(list_option)

    def parse_list_question(self, list_question):
        parse_list_question = []
        for question in list_question:
            parse_list_question.append({
                "id": question.id,
                "description": question.description,
                "num_of_second": question.numOfSecond,
                "image_question_url": question.imageQuestionUrl,
                "score": question.score
            })
        return parse_list_question

    def parse_list_option(self, list_option):
        parse_list_option = []
        for option in list_option:
            parse_list_option.append({
                "id": option.id,
                "question": option.questionOf.id,
                "content": option.content,
                "image_option_url": option.imageOptionUrl
            })
        return parse_list_option
