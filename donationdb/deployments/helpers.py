import json
import requests
from donationdb.settings import HEROKU_OATH_TOKEN

def latest_releases(heroku_app):
    response = requests.get(
        f"{HEROKU_URL_BASE}/apps/{heroku_app}/releases",
        headers={
            "Accept": "application/vnd.heroku+json; version=3",
            "Authorization": f"Bearer {HEROKU_OATH_TOKEN}"
        }
    )
    print(json.loads(response.text))
    newest_releases_first = sorted(
        json.loads(response.text),
        key=lambda release: release["created_at"].lower(),
        reverse=True
    )
    return newest_releases_first

HEROKU_URL_BASE = "https://api.heroku.com"
