from rest_framework import serializers
from watches.models import Watch


class WatchSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="watches:watch-detail")
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Watch
        fields = [
            "url",
            "created_at",
            "modified_at",
            "id",
            "owner",
            "watch_url",
            "name",
        ]

    def create(self, validated_data):
        if "owner" not in validated_data:
            validated_data["owner"] = self.context["request"].user
        return Watch.objects.create(**validated_data)
