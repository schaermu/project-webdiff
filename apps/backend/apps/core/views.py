from django.shortcuts import get_object_or_404
from rest_framework import permissions, generics, status

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
)

from apps.backend.common.turnstile import TurnstileUtils

from .serializers import UserSerializer, RegistrationSerializer, VerifyEmailSerializer
from .models import User


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


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegistrationSerializer

    def post(self, request: Request) -> Response:
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class VerifyEmailView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = VerifyEmailSerializer
    http_method_names = ["post"]

    def post(self, request: Request) -> Response:
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(verification_uuid=serializer.validated_data["token"])
        user.is_verified = True
        user.verification_uuid = None
        user.save()
        return Response("Email verified", status=status.HTTP_200_OK)


class ResendVerificationEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request) -> Response:
        user = get_object_or_404(User, verification_uuid=request.data["token"])
        user.generate_verification_uuid()
        user.send_verification_email()
        return Response("Verification email sent", status=status.HTTP_200_OK)
