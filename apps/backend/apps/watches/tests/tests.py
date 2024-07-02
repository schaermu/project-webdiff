import pytest
from django.urls import reverse
from .factories import WatchFactory

pytestmark = pytest.mark.django_db


class TestWatchesCRUD:
    watch_list_url = reverse("watches:watch-list")

    def test_create_watch(self, api_client):
        data = {
            "watch_url": "https://www.youtube.com/watch?v=9bZkp7q19f0",
            "name": "Gangnam Style",
        }

        response = api_client.post(self.watch_list_url, data)
        assert response.status_code == 201

        returned_json = response.json()
        assert "id" in returned_json
        assert returned_json["watch_url"] == data["watch_url"]
        assert returned_json["name"] == data["name"]

    def test_retrieve_watches(self, api_client):
        num_watches = 5
        WatchFactory.create_batch(num_watches)
        response = api_client.get(self.watch_list_url)
        assert response.status_code == 200
        assert len(response.json()["results"]) == num_watches

    def test_delete_blog(self, api_client):
        watch = WatchFactory()
        url = reverse("watches:watch-detail", kwargs={"pk": watch.id})
        response = api_client.delete(url)
        assert response.status_code == 204

    def test_update_blog(self, api_client):
        watch = WatchFactory()
        data = {
            "watch_url": "https://www.youtube.com/watch?v=9bZkp7q19f0",
            "name": "Gangnam Style",
        }
        url = reverse("watches:watch-detail", kwargs={"pk": watch.id})

        response = api_client.patch(url, data)
        assert response.status_code == 200

        returned_json = response.json()
        assert returned_json["watch_url"] == data["watch_url"]
        assert returned_json["name"] == data["name"]
