from datetime import datetime
import hmac
import secrets

def calculate_hmac(headers, secret, body=""):
    message = "\n".join(
        [f"{key}:{value}" for key, value in headers.items()] + [body]
    )
    return hmac.new(
        secret.encode("ascii"),
        message.encode("ascii"),
        "sha256"
    ).hexdigest()

def signed_paytrail_headers(account_id, secret):
    headers = {
        "checkout-account": account_id,
        "checkout-algorithm": "sha256",
        "checkout-method": "GET",
        "checkout-nonce": f"{secrets.randbelow(NONCE_UPPER_BOUNDS)}",
        "checkout-timestamp": datetime.now().isoformat()
    }
    signature = calculate_hmac(headers, secret)
    headers.update({ "signature": signature })
    return headers

NONCE_UPPER_BOUNDS = 1000000000000000000
