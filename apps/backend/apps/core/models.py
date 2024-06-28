from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

from apps.backend.common.email import EmailUtil


class User(AbstractUser):
    is_verified = models.BooleanField(default=False)
    verification_uuid = models.UUIDField(null=True, blank=True)

    def __str__(self):
        return self.email

    def generate_verification_uuid(self):
        from uuid import uuid4

        self.verification_uuid = uuid4()
        self.save()

    def send_verification_email(self):
        EmailUtil.send_email(
            {
                "email_subject": "Verify your email",
                "email_body": f"Click here to verify your email: {settings.BASE_URL}/verify-email/{self.verification_uuid}",
                "to_email": self.email,
            }
        )


class TimestampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class OwnedMixin(models.Model):
    owner = models.ForeignKey("core.User", on_delete=models.CASCADE)

    class Meta:
        abstract = True
