from typing import Any
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.base_user import AbstractBaseUser
from django.http import HttpRequest


class CustomModelBackend(ModelBackend):
    def authenticate(
        self,
        request: HttpRequest,
        username: str = None,
        password: str = None,
        **kwargs: Any
    ) -> AbstractBaseUser:
        user = super().authenticate(request, username, password, **kwargs)
        if user and not user.is_verified and not user.is_superuser:
            return None
        return user
