from django.core.serializers import serialize
from django.forms.models import model_to_dict
from django.http import HttpResponse
from django.http.response import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from donationdb.settings import DONATIONDB_URL, SENDGRID_API_KEY
from payments.models import TransactionSerializer
from payments.models import Transaction
from donations.models import Contribution, Donor
from .helpers import PAYTRAIL_TEST_ACCOUNT_ID, PAYTRAIL_TEST_ACCOUNT_SECRET, payments_request_body, signed_paytrail_headers, verify_response_headers
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To
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


@csrf_exempt
def transaction_group(request, transaction):
    if request.method != "PUT":
        return HttpResponseNotAllowed()

    group_name = request.body.decode("utf-8")

    transaction = Transaction.objects \
        .select_related("contribution")  \
        .get(checkout_transaction_id = transaction)

    transaction.contribution.group_name = group_name
    transaction.contribution.save()
    response = f"Group name for {transaction} changed to {group_name}"
    logger.info(response)
    return HttpResponse(response)


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
        checkout_reference = payment_providers["reference"],
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

    logger.info("Success for transaction %s  %s", checkout_transaction_id)
    transaction = Transaction.objects.get(checkout_transaction_id=checkout_transaction_id)
    donor_email = transaction.contribution.donor.email
    donation_sum = transaction.contribution.sum

    logger.info("Sending confirmation email to %s", donor_email)

    confirmation_email = Mail(
        from_email = ("vision.tf.fi.heroku@berggren.dev", "Teknologföreningen"),
        to_emails = To(
            donor_email,
            dynamic_template_data = {
            "sum_as_concrete": str(round(donation_sum / 180, 2)),
            "sum_as_dance_floor": str(round(10_000 * donation_sum / 4815)),
            "sum_as_percentage": str(round(100 * donation_sum / 6_500_00, 4)),
            "link_to_donation": f"{DONATIONDB_URL}/donation?betalning=ok&checkout-transaction-id={checkout_transaction_id}"
        })
    )
    confirmation_email.template_id = "d-8e0408340b73439494bb26e5b6d16567"
    sendgrid_client.send(confirmation_email)

    logger.info("Updating payment status to OK")
    transaction = Transaction.objects.get(checkout_transaction_id=checkout_transaction_id)
    transaction.status = request.GET["checkout-status"]
    transaction.save()

    return HttpResponse("Updated transaction status")


sendgrid_client = SendGridAPIClient(SENDGRID_API_KEY)
logger = logging.getLogger(__name__)

PAYTRAIL_URL = "https://services.paytrail.com"
