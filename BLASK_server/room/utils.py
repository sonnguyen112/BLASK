from quiz.models import Question, Option

def check_answer(question_id, option_id_player_choose):
    question = Question.objects.get(id=question_id)
    list_option = Option.objects.filter(questionOf = question)
    true_option = None
    for option in list_option:
        if option.isTrue == True:
            true_option = option
            break
    if true_option.id == option_id_player_choose:
        return True
    else:
        return False
