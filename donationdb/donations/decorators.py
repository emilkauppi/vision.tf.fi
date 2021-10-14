from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from donationdb.settings import API_KEY

def requires_api_key(function):
    def _requires_api_key(request, *args, **kwargs):
        if request.method != "GET":
            return HttpResponse("GET request expected", status=400)

        if request.GET.get("api_key", "") == API_KEY:
            return function(request, *args, **kwargs)
        else:
            return HttpResponse("Invalid API key", status=400)

    return csrf_exempt(_requires_api_key)
