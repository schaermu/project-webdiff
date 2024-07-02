from django.urls import path, include
from rest_framework import routers

from . import views

app_name = "watches"

router = routers.DefaultRouter()
router.register("", views.WatchViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
