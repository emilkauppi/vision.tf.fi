import binascii
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.db.models import Count, Sum
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from humps import decamelize
import json
from .decorators import requires_api_key
from .models import Donation

@login_required
def index(request):
    context = {
        "donations": Donation.objects.order_by("-id"),
        "total_donations": Donation.objects.aggregate(
            count=Count("id"),
            sum=Sum("donation_sum")
        )
    }
    return render(request, "donations/index.html", context)

@login_required
def donation(request, donation_letter_id):
    donation_letter = Donation.objects.get(id=donation_letter_id)
    context = {
        "donation": donation_letter,
        "subpage": f"{donation_letter.first_name} {donation_letter.last_name}"
    }
    return render(request, "donations/donation.html", context = context)

@login_required
def donation_letter_download(request, donation_letter_id):
    donation_letter = Donation.objects.get(id=donation_letter_id)
    response = HttpResponse(donation_letter.pdf, content_type="application/pdf")
    response["Content-Disposition"] = f"attachment; filename=donationsbrev_{donation_letter.first_name}_{donation_letter.last_name}.pdf"
    return response

@requires_api_key
def new(request):
    if request.method != "POST":
        return HttpResponse("POST request expected", status=400)

    try:
        pdf_and_form_data = json.loads(request.body)
    except:
        return HttpResponse("POST request expected JSON body", status=400)

    donation_letter = Donation()

    pdf = pdf_and_form_data["pdf"]
    form_data = pdf_and_form_data["formData"]

    # Set payment data
    for field, value in form_data.items():
        field = decamelize(field)
        setattr(donation_letter, field, value)

    # Set contact person data
    for field, value in form_data["contactPerson"].items():
        field = decamelize(field)
        setattr(donation_letter, field, value)

    # Set potential organizational data
    for field, value in form_data["organization"].items():
        print(f"{field}: {value}")
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
