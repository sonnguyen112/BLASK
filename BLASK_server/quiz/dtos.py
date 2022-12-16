class GetAllQuizDTO():
    def __init__(self, quiz_list) -> None:
        self.quiz_list = list(
            map(lambda x: {
                "title": x["title"], 
                "avatar": x["imageQuizUrl"], 
                "slug": x["slug"]
                }, quiz_list))

class GetOneQuizDTO():
    def __init__(self, quiz, list_question, list_option) -> None:
        self.title = quiz.title
        self.description = quiz.description
        self.imageQuizUrl = quiz.imageQuizUrl
        self.list_question = self.parse_list_question(list_question)
        self.list_option = self.parse_list_option(list_option)

    def parse_list_question(self, list_question):
        parse_list_question = []
        for question in list_question:
            parse_list_question.append({
                "id" : question.id,
                "description" : question.description,
                "num_of_second" : question.numOfSecond,
                "image_question_url" : question.imageQuestionUrl,
                "score" : question.score
            })
        return parse_list_question

    def parse_list_option(self, list_option):
        parse_list_option = []
        for option in list_option:
            parse_list_option.append({
                "question" : option.questionOf.id,
                "content" : option.content,
                "image_option_url": option.imageOptionUrl,
                "is_true" : option.isTrue
            })
        return parse_list_option