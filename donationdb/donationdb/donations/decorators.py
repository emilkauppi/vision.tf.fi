from django.http import HttpResponse
import json
import os

def requires_api_key(function):
    def _requires_api_key(request, *args, **kwargs):
        if request.method != "POST":
            return HttpResponse("POST request expected", status=400)

        try:
            body = json.loads(request.body)
        except Exception as error:
            return HttpResponse("POST request expected JSON body", status=400)

        api_key = body.get("apiKey")
        expected_api_key = os.environ["DONATIONDB_API_KEY"]

        if api_key == expected_api_key:
            return function(request, *args, **kwargs)
        else:
            return HttpResponse("Invalid API key", status=400)

    return _requires_api_key