from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "groups"]


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["email", "password", "password2"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        user = User.objects.create(email=validated_data["email"])

        user.set_password(validated_data["password"])
        user.save()

        user.generate_verification_uuid()
        user.send_verification_email()

        return user


class VerifyEmailSerializer(serializers.Serializer):
    token = serializers.UUIDField()

    class Meta:
        fields = ["token"]

    def validate(self, attrs):
        user = User.objects.get(verification_uuid=attrs["token"])
        if not user:
            raise serializers.ValidationError("Invalid verification token.")
        return attrs
