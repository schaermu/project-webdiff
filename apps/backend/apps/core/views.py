from rest_framework import permissions

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer


class Me(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
