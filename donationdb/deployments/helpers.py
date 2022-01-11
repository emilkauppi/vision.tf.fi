from datetime import datetime, timezone
import dateutil.parser
import json
from math import floor
import requests
from donationdb.settings import HEROKU_OATH_TOKEN

def latest_releases(heroku_app):
    response = requests.get(
        f"{HEROKU_URL_BASE}/apps/{heroku_app}/releases",
        headers=HEROKU_HEADERS
    )
    newest_releases_first = sorted(
        json.loads(response.text),
        key=lambda release: release["created_at"].lower(),
        reverse=True
    )
    formatted = [
        {
            "created_at": dateutil.parser.isoparse(release["created_at"]),
            "description": release["description"],
            "time_since": time_since_as_text(dateutil.parser.isoparse(release["created_at"])),
            "status": release["status"]
        }
        for release in newest_releases_first
    ]
    return formatted


def time_since_as_text(time=False):
    """
    Get a datetime object or a int() Epoch timestamp and return a
    pretty string like 'an hour ago', 'Yesterday', '3 months ago',
    'just now', etc
    Remixed from: https://stackoverflow.com/questions/1551382/user-friendly-time-format-in-python
    """
    now = datetime.now(timezone.utc)
    if type(time) is int:
        diff = now - datetime.fromtimestamp(time)
    elif isinstance(time,datetime):
        diff = now - time
    elif not time:
        diff = now - now
    second_diff = diff.seconds
    day_diff = diff.days

    if day_diff < 0:
        return ''

    if day_diff == 0:
        if second_diff < 10:
            return "nyss"
        if second_diff < 60:
            return str(second_diff) + " sekunder sedan"
        if second_diff < 120:
            return "a minute ago"
        if second_diff < 3600:
            return str(floor(second_diff / 60)) + " minuter sedan"
        if second_diff < 7200:
            return "en timme sedan"
        if second_diff < 86400:
            return str(floor(second_diff / 3600)) + " timmar sedan"
    if day_diff == 1:
        return "Igår"
    if day_diff < 7:
        return str(day_diff) + " dagar sedan"
    if day_diff < 31:
        return str(floor(day_diff / 7)) + " veckor sedan"
    if day_diff < 365:
        return str(floor(day_diff / 30)) + " månder sedan"
    return str(day_diff / 365) + " år sedan"


HEROKU_HEADERS = {
    "Accept": "application/vnd.heroku+json; version=3",
    "Authorization": f"Bearer {HEROKU_OATH_TOKEN}"
}
HEROKU_URL_BASE = "https://api.heroku.com"
