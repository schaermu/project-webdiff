from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class TimestampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class OwnedMixin(models.Model):
    owner = models.ForeignKey("core.User", on_delete=models.CASCADE)

    class Meta:
        abstract = True
