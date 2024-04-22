from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path("api/", include("watches.urls")),
    re_path(r"^api/auth/", include("djoser.urls")),
    re_path(r"^api/auth/", include("djoser.urls.jwt")),
    path("admin/", admin.site.urls),
]