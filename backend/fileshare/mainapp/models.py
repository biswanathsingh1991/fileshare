from django.db import models
from django.contrib.auth.models import User
from django_extensions.db.fields import (
    CreationDateTimeField, ModificationDateTimeField)


class File(models.Model):
    owner = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.CASCADE, related_name="onwer_user")
    share_with = models.ManyToManyField(
        User, related_name="share_user")
    file = models.FileField(upload_to='documents/%Y/%m/%d/')
    timestamp_created = CreationDateTimeField()
    timestamp_modified = ModificationDateTimeField()
