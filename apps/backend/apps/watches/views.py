from rest_framework import permissions, viewsets

from .models import Watch
from .serializers import WatchSerializer


class WatchViewSet(viewsets.ModelViewSet):
    queryset = Watch.objects.all()
    serializer_class = WatchSerializer
    permission_classes = [permissions.IsAuthenticated]
