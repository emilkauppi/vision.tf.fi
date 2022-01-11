from django.contrib.auth.decorators import login_required
from django.shortcuts import render
import requests

from deployments.helpers import latest_releases
from donationdb.settings import HEROKU_APP_VISION_TF_FI, HEROKU_APP_STAGING_VISION_TF_FI

@login_required
def index(request):
    staging_releases = latest_releases(HEROKU_APP_STAGING_VISION_TF_FI)
    production_releases = latest_releases(HEROKU_APP_VISION_TF_FI)
    context = {
        "subpage": "Deployments",
        "production_releases": production_releases,
        "staging_releases": staging_releases
    }
    return render(request, "deployments/index.html", context)
