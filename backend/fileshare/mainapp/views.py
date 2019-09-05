from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from .serializers import FileUploadSerializer, FileRetriveSerializer, FileShareSerializer
from rest_framework.response import Response
from rest_framework.parsers import (
    FormParser, FileUploadParser, MultiPartParser)
from rest_framework import status
from rest_framework.authentication import (
    TokenAuthentication, BasicAuthentication)
from rest_framework.permissions import IsAuthenticated
from .models import File
from django.contrib.auth.models import User


class FileUploadView(CreateAPIView):

    serializer_class = FileUploadSerializer
    parser_classes = (MultiPartParser, )
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        for key, value in request.FILES.items():
            serializer = self.get_serializer(
                data={"owner": request.user.id, "file": value})
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(status=status.HTTP_201_CREATED, headers=headers)


class UserFileRetirveView(ListAPIView):
    serializer_class = FileRetriveSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.request.user.onwer_user.all()


class UserSharedAccessFileRetirveView(ListAPIView):
    serializer_class = FileRetriveSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.request.user.share_user.all()


class FileShareView(GenericAPIView):

    serializer_class = FileShareSerializer
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = File.objects.get(id=serializer.validated_data.get("file_id"))
        email = serializer.validated_data.get("email")
        if User.objects.filter(email=email):
            file.share_with.add(User.objects.get(email=email))
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
