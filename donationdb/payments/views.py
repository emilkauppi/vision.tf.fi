from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.clickjacking import xframe_options_exempt
from .helpers import calculate_hmac, signed_paytrail_headers
import requests

@xframe_options_exempt
def form(request):
    payment_providers_response = requests.get(
        f"{PAYTRAIL_URL}/merchants/payment-providers",
        headers = signed_paytrail_headers(
            PAYTRAIL_TEST_ACCOUNT_ID,
            PAYTRAIL_TEST_ACCOUNT_SECRET
        )
    )
    response = HttpResponse(
        content_type = "application/json"
    )
    response.write(payment_providers_response.text)
    return response

PAYTRAIL_TEST_ACCOUNT_ID = "375917"
PAYTRAIL_TEST_ACCOUNT_SECRET = "SAIPPUAKAUPPIAS"
PAYTRAIL_URL = "https://services.paytrail.com"
