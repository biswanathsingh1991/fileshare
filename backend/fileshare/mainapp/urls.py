from django.contrib import admin
from django.urls import path, include
from .views import FileUploadView, UserFileRetirveView, FileShareView, UserSharedAccessFileRetirveView

app_name = "mainapp"

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name="fileupload"),
    path('list/', UserFileRetirveView.as_view(), name="userfileview"),
    path('share/', FileShareView.as_view(), name="fileshare"),
    path('share/access/', UserSharedAccessFileRetirveView.as_view(),
         name="fileshareaccess"),



]
