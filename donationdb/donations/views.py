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
from .models import Contribution, DonationLetter

@login_required
def index(request):
    context = {
        "donations": Contribution.objects.order_by("-id"),
        "total_donations": Contribution.objects.aggregate(
            count=Count("id"),
            sum=Sum("sum")
        )
    }
    return render(request, "donations/index.html", context)

@login_required
def donation(request, contribution_id):
    contribution = Contribution.objects.get(id=contribution_id)
    context = {
        "donation": contribution,
        "subpage": f"{contribution.donor.name}"
    }
    return render(request, "donations/donation.html", context = context)

@requires_api_key
def export(request):
    response = HttpResponse(
        content_type = "text/csv"
    )
    response.write(codecs.BOM_UTF8)
    writer = csv.writer(response)
    headers = [
        "donor",
        "sum"
    ]
    writer.writerow(headers)
    for contribution in Contribution.objects.all():
        donor = contribution.donor.name if contribution.organization == None \
            else contribution.organization.name
        row_values = [
            donor,
            contribution.sum
        ]
        writer.writerow(row_values)
    return response
