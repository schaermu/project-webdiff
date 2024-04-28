from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers

from . import views

urlpatterns = [
    path("users/me", views.Me.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
