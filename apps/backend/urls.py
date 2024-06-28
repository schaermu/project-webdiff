from django.contrib import admin
from django.urls import path, include

from ipware import get_client_ip

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
)

from apps.backend.common.turnstile import TurnstileUtils


class TokenObtainPairView(BaseTokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        ip, _ = get_client_ip(request)
        if "captcha" in request.data and TurnstileUtils.verify_captcha(
            request.data["captcha"], ip
        ):
            return super().post(request, *args, **kwargs)
        return Response("Invalid captcha", status=status.HTTP_400_BAD_REQUEST)


urlpatterns = [
    path("api/", include("core.urls")),
    path("api/", include("watches.urls")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("admin/", admin.site.urls),
]
