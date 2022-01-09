import csv
import codecs
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.db.models import Count, Sum, Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from humps import decamelize
from itertools import groupby
import json
from .decorators import requires_api_key
from .models import Contribution, DonationLetter
from payments.models import Transaction

@login_required
def index(request):
    context = {
        "donations": Contribution.valid_contributions(),
        "total_donations": {
            "sum": Contribution.total_sum()
        }
    }
    return render(request, "donations/index.html", context)


def all(request):
    donationletters_and_transactions = [
        *DonationLetter.objects.exclude(contribution__visibility="anonymous"),
        *Transaction.objects.exclude(Q(contribution__visibility="anonymous") | ~Q(status="ok"))
    ]
    contributions = map(
        lambda x: x.contribution,
        donationletters_and_transactions
    )

    all_contributions = {
        "donors": [],
    }
    for contribution in contributions:
        donor_name = None
        if contribution.organization == None:
            donor_name = contribution.donor.name if contribution.visibility == "visible" \
                else contribution.donor.pseudonym
        else:
            donor_name = contribution.organization.name
        all_contributions["donors"].append(donor_name)
    all_contributions["donors"].sort()

    response = HttpResponse(content_type = "application/json")
    response.write(json.dumps(all_contributions))
    return response


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
    for contribution in Contribution.valid_contributions():
        donor = contribution.donor.name if contribution.organization == None \
            else contribution.organization.name
        row_values = [
            donor,
            contribution.sum
        ]
        writer.writerow(row_values)
    return response


def groups(request):
    potential_checkout_transaction_id = request.GET.get("checkout-transaction-id")
    potential_transaction = Transaction.objects.filter(checkout_transaction_id=potential_checkout_transaction_id).first()
    potential_contribution_id = potential_transaction.contribution.id if potential_transaction != None else None

    donationletters_and_transactions = [
        *DonationLetter.objects.exclude(
            Q(contribution__visibility="anonymous")
        ).order_by("contribution__group_name"),
        *Transaction.objects.exclude(
            Q(contribution__visibility="anonymous") | ~Q(status="ok")
        ).order_by("contribution__group_name")
    ]
    group_names_and_members = map(
        lambda x: (
            x.contribution.group_name,
            x.contribution.display_name(),
            x.contribution.id == potential_contribution_id
        ),
        donationletters_and_transactions
    )
    members_by_group_name = [(group_name, list(members)) for (group_name, members) in groupby(group_names_and_members, lambda x: x[0])]
    group_names_and_members = {
        "groups": []
    }
    for group_name, members in members_by_group_name:
        if group_name == "":
            group_names_and_members["others"] = sorted([member[1] for member in members])
        else:
            members = list(members)
            group_names_and_members["groups"].append({
                "name": group_name,
                "members": [y[1] for y in members],
                "isMember": True in [y[2] for y in members]
            })
    response = HttpResponse(content_type = "application/json")
    response.write(json.dumps(group_names_and_members))
    return response


def sum(request):
    return JsonResponse({ "total_sum": Contribution.total_sum() })