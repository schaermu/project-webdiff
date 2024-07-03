import uuid
from django.db import models

from core.models import TimestampMixin, OwnedMixin


class Watch(TimestampMixin, OwnedMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    watch_url = models.URLField()
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        if self.name:
            return self.name
        return str(self.url)
