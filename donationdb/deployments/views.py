from django.contrib.auth.decorators import login_required
from django.shortcuts import render
import requests

from deployments.helpers import latest_releases
from donationdb.settings import HEROKU_APP_VISION_TF_FI

@login_required
def index(request):
    releases = latest_releases(HEROKU_APP_VISION_TF_FI)
    context = {
        "subpage": "Deployments",
        "releases": releases
    }
    print(context["releases"])
    return render(request, "deployments/index.html", context)
