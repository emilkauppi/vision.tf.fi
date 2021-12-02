from django.core.serializers import serialize
from django.forms.models import model_to_dict
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from payments.models import TransactionSerializer
from payments.models import Transaction
from donations.models import Contribution, Donor
from .helpers import PAYTRAIL_TEST_ACCOUNT_ID, PAYTRAIL_TEST_ACCOUNT_SECRET, payments_request_body, signed_paytrail_headers, verify_response_headers
import logging
import json
import requests
import uuid


def transaction(request, transaction):
    transaction = Transaction.objects \
        .select_related("contribution")  \
        .get(checkout_transaction_id = transaction)
    transaction_json = TransactionSerializer(transaction)

    return JsonResponse(transaction_json.data, safe=False)


# Exempting as there is no difference who calls this endpoint
# https://kylebebak.github.io/post/csrf-protection
@csrf_exempt
def providers(request):
    donation = json.loads(request.body)
    _, contribution = save_donor_and_contribution(donation)

    stamp = uuid.uuid1().hex
    body = payments_request_body(stamp, contribution.sum, contribution.donor.email)
    body_json = json.dumps(body)
    payment_providers_response = requests.post(
        f"{PAYTRAIL_URL}/payments",
        headers = {
            **signed_paytrail_headers(
                PAYTRAIL_TEST_ACCOUNT_ID,
                PAYTRAIL_TEST_ACCOUNT_SECRET,
                body_json
            ),
            **{
                "Content-Type": "application/json; charset=utf-8"
            }
        },
        data=body_json
    )
    verify_response_headers(payment_providers_response.headers, PAYTRAIL_TEST_ACCOUNT_SECRET, payment_providers_response.text)

    payment_providers = json.loads(payment_providers_response.text)
    payment = Transaction(
        checkout_transaction_id = payment_providers["transactionId"],
        status = "new",
        contribution = contribution
    )
    logger.info("Creating new payment %", payment)
    payment.save()

    response = HttpResponse(
        content_type = "application/json"
    )
    response.write(payment_providers_response.text)
    return response


def save_donor_and_contribution(donation):
    donor = Donor(
        name = donation["name"],
        pseudonym = donation["pseudonym"],
        email = donation["email"]
    )
    donor.full_clean()
    donor.save()
    contribution = Contribution(
        donor = donor,
        visibility = donation["visibility"],
        sum = donation["sum"]
    )
    contribution.full_clean()
    contribution.save()

    return donor, contribution


def success(request):
    verify_response_headers(request.GET, PAYTRAIL_TEST_ACCOUNT_SECRET, "")

    checkout_transaction_id = request.GET["checkout-transaction-id"]
    logger.info("Updating transaction %s status to ok", checkout_transaction_id)

    transaction = Transaction.objects.get(checkout_transaction_id=checkout_transaction_id)
    transaction.status = request.GET["checkout-status"]
    transaction.save()

    return HttpResponse("Updated transaction status")


logger = logging.getLogger(__name__)

PAYTRAIL_URL = "https://services.paytrail.com"
