import requests
from django.conf import settings


class TurnstileUtils:
    @staticmethod
    def verify_captcha(response: str, remote_ip: str) -> bool:
        url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
        data = {
            "secret": settings.TURNSTILE_SECRET_KEY,
            "response": response,
            "remote_ip": remote_ip,
        }

        response = requests.post(url, data=data)

        if response.status_code == 200:
            json = response.json()
            if json["success"]:
                return True
            else:
                return False
