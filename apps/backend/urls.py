from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
)


class TokenObtainPairView(BaseTokenObtainPairView):
    pass


urlpatterns = [
    path("api/", include("core.urls")),
    path("api/", include("watches.urls")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("admin/", admin.site.urls),
]
