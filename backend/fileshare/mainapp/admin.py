from django.contrib import admin
from .models import File
# Register your models here.


class FilesAdmin(admin.ModelAdmin):
    list_display = ["owner", "file", "timestamp_created",]

    class Meta:
        model = File


admin.site.register(File, FilesAdmin)
