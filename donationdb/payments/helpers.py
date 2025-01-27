from datetime import datetime
import hmac
import secrets
from donationdb.settings import DONATIONDB_URL, FRONTEND_URL


def calculate_hmac(headers, secret, body=""):
    sorted_headers = sorted(headers.items(), key=lambda x: x[0])
    message = "\n".join(
        [f"{key}:{value}" for key, value in sorted_headers] + [body]
    )
    return hmac.new(
        secret.encode("utf-8"),
        message.encode("utf-8"),
        "sha256"
    ).hexdigest()


def payments_request_body(stamp, sum_decimal_euros, email):
    sum = int(sum_decimal_euros * 100)
    return {
        "stamp": stamp,
        "reference": stamp,
        "amount": sum,
        "currency": "EUR",
        "language": "SV",
        "items": [
            {
                "unitPrice": sum,
                "units": 1,
                "vatPercentage": 0,
                "productCode": "donation",
                "description": "Donation till Vision TF"
            }
        ],
        "customer": {
            "email": email
        },
        "redirectUrls": {
            "success": f"{FRONTEND_URL}/donation?betalning=ok",
            "cancel": f"{FRONTEND_URL}/stod-projektet"
        },
        "callbackUrls": {
            "success": f"{DONATIONDB_URL}/payments/success"
        }
    }


def signed_paytrail_headers(account_id, secret, body):
    headers = {
        "checkout-account": account_id,
        "checkout-algorithm": "sha256",
        "checkout-method": "POST",
        "checkout-nonce": f"{secrets.randbelow(NONCE_UPPER_BOUNDS)}",
        "checkout-timestamp": datetime.now().isoformat()
    }
    signature = calculate_hmac(headers, secret, body)
    headers.update({ "signature": signature })
    return headers


def verify_response_headers(headers, secret, body):
    expected_signature = calculate_hmac(
        dict(
            filter(
                lambda x: "checkout-" in x[0],
                headers.items()
            )
        ),
        secret,
        body
    )
    if expected_signature != headers["signature"]:
        raise Exception("Invalid Paytrail headers")


NONCE_UPPER_BOUNDS = 1000000000000000000