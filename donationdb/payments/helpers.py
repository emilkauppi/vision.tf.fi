from datetime import datetime
import hmac
import secrets

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

def payments_request_body(stamp, sum):
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
            "email": "list@berggren.dev"
        },
        "redirectUrls": {
            "success": "https://donationdb.local:8000/stod-projektet?betalning=ok",
            "cancel": "https://donationdb.local:8000/stod-projektet?betalning=avbruten"
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
    return expected_signature == headers["signature"]

NONCE_UPPER_BOUNDS = 1000000000000000000
