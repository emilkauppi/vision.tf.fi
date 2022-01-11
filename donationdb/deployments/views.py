from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from deployments.helpers import build, latest_builds
from donationdb.settings import HEROKU_APP_VISION_TF_FI, HEROKU_APP_STAGING_VISION_TF_FI

@login_required
def index(request):
    staging_releases = latest_builds(HEROKU_APP_STAGING_VISION_TF_FI)
    production_releases = latest_builds(HEROKU_APP_VISION_TF_FI)
    context = {
        "subpage": "Deployments",
        "production_releases": production_releases,
        "staging_releases": staging_releases
    }
    return render(request, "deployments/index.html", context)

@login_required
def promote(request):
    build(HEROKU_APP_VISION_TF_FI)
    return redirect("deployments_index")