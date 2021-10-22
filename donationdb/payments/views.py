from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.clickjacking import xframe_options_exempt

@xframe_options_exempt
def form(request):
    response = HttpResponse(
        content_type = "text/plain"
    )
    response.write("Hello world!")
    return response