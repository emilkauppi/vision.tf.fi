import csv
import codecs
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.db.models import Count, Sum
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from humps import decamelize
import json
from .decorators import requires_api_key
from .models import DonationLetter

@login_required
def index(request):
    context = {
        "donations": DonationLetter.objects.order_by("-id"),
        "total_donations": DonationLetter.objects.aggregate(
            count=Count("id"),
            sum=Sum("donation_sum")
        )
    }
    return render(request, "donations/index.html", context)

@login_required
def donation(request, donation_letter_id):
    donation_letter = DonationLetter.objects.get(id=donation_letter_id)
    context = {
        "donation": donation_letter,
        "subpage": f"{donation_letter.donor.name}"
    }
    return render(request, "donations/donation.html", context = context)

@requires_api_key
def export(request):
    response = HttpResponse(
        content_type = "text/csv"
    )
    response.write(codecs.BOM_UTF8)
    writer = csv.writer(response)
    fields = list(map(lambda field: field.name, DonationLetter._meta.get_fields()))
    writer.writerow(fields)
    for row in DonationLetter.objects.all():
        row_values = map(lambda field_name: getattr(row, field_name), fields)
        writer.writerow(row_values)
    return response
