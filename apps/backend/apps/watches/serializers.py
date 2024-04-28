from rest_framework import serializers
from watches.models import Watch


class WatchSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Watch
        fields = [
            "@self",
            "created_at",
            "modified_at",
            "id",
            "owner",
            "url",
            "name",
        ]

    def create(self, validated_data):
        if "owner" not in validated_data:
            validated_data["owner"] = self.context["request"].user
        return Watch.objects.create(**validated_data)
