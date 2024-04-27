from rest_framework import permissions

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from .serializers import UserSerializer


class Me(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer_context = {
            "request": request,
        }

        serializer = UserSerializer(
            request.user,
            context=serializer_context,
        )
        return Response(serializer.data)
