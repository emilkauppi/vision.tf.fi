from django.http import HttpResponse
from .helpers import payments_request_body, signed_paytrail_headers, verify_response_headers
import logging
import json
import requests
import uuid

def providers(request):
    stamp = uuid.uuid1().hex
    body = payments_request_body(stamp, 10000)
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
    is_response_valid = verify_response_headers(payment_providers_response.headers, PAYTRAIL_TEST_ACCOUNT_SECRET, payment_providers_response.text)
    if not is_response_valid:
        response = HttpResponse(
            content_type = "text/plain",
            status = 500
        )
        error_message = "Invalid signature in Paytrail response"
        response.write(error_message)
        logger.error(error_message)
        return response

    response = HttpResponse(
        content_type = "application/json"
    )
    response.write(payment_providers_response.text)
    return response

logger = logging.getLogger(__name__)

PAYTRAIL_TEST_ACCOUNT_ID = "375917"
PAYTRAIL_TEST_ACCOUNT_SECRET = "SAIPPUAKAUPPIAS"
PAYTRAIL_URL = "https://services.paytrail.com"
