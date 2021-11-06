from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from payments.models import Payment
from donations.models import Contribution, Donor
from .helpers import payments_request_body, signed_paytrail_headers, verify_response_headers
import logging
import json
import requests
import uuid

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
    payment = Payment(
        transaction = payment_providers["transactionId"],
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


logger = logging.getLogger(__name__)

PAYTRAIL_TEST_ACCOUNT_ID = "375917"
PAYTRAIL_TEST_ACCOUNT_SECRET = "SAIPPUAKAUPPIAS"
PAYTRAIL_URL = "https://services.paytrail.com"
