from django.http import HttpResponse
from django.shortcuts import render

def new(request):
    return HttpResponse("Hello world!")