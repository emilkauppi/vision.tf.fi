import binascii
from django.core.exceptions import ValidationError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from humps import decamelize
import json
from .models import DonationLetter

def new(request):
    if request.method != "POST":
        return HttpResponse("POST request expected", status=400)

    try:
        pdf_and_form_data = json.loads(request.body)
    except:
        return HttpResponse("POST request expected JSON body", status=400)

    donation_letter = DonationLetter()

    pdf = pdf_and_form_data["pdf"]
    form_data = pdf_and_form_data["formData"]

    # Set contact person data
    for field, value in form_data.items():
        field = decamelize(field)
        setattr(donation_letter, field, value)

    # Set potential organizational data
    for field, value in form_data["contactPerson"].items():
        field = decamelize(field)
        setattr(donation_letter, field, value)

    # Store form data blob
    donation_letter.form_data = form_data

    # Store donation letter PDF
    donation_letter.pdf = binascii.a2b_base64(pdf)

    try:
        donation_letter.full_clean()
    except ValidationError as error:
        print(f"Missing/invalid POST data: {error}")
        return HttpResponse("Missing/invalid POST data: {error}", status=400)
    donation_letter.save()
    return JsonResponse({ "id": donation_letter.id })
