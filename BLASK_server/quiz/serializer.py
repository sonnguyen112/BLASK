from rest_framework import serializers
from .models import *

class QuizSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Quiz
        fields = '__all__'
        # exclude = ['createAt']
    

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'
