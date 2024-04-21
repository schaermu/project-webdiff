from rest_framework import serializers
from watches.models import Watch


class WatchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Watch
        fields = [
            "@self",
            "created_at",
            "modified_at",
            "id",
            "url",
            "name",
        ]
