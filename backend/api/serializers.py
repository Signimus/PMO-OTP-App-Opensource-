from rest_framework import serializers
from . models import *



class CustomUserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('username','id')