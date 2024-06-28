from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers

from . import views

urlpatterns = [
    path("users/me/", views.Me.as_view()),
    path("users/register/", views.RegisterView.as_view(), name="register"),
    path("users/verify-email/", views.VerifyEmailView.as_view(), name="verify-email"),
    path(
        "users/resend-verification-email/",
        views.ResendVerificationEmailView.as_view(),
        name="resend-verification-email",
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
