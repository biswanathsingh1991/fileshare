from rest_framework import serializers
from .models import File
from django.contrib.auth.models import User


class FileUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ("owner", "file")


class FileRetriveSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = "__all__"
        depth = 1


class FileShareSerializer(serializers.Serializer):

    file_id = serializers.IntegerField()
    email = serializers.EmailField()
