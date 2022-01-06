from django.test import TestCase
from django.test.client import Client
from donationdb.settings import PAYTRAIL_ACCOUNT_SECRET
from donations.models import Contribution, Donor
from payments.helpers import calculate_hmac
from payments.models import Transaction

class PaymentViewTestCase(TestCase):
    def setUp(self):
        donor = Donor.objects.create(
            name = "Pelle"
        )
        donor.save()

        contribution = Contribution.objects.create(
            donor = donor,
            visibility = "visible",
            sum = 1000
        )
        contribution.save()

        self.transaction = Transaction.objects.create(
            checkout_transaction_id = "1234",
            contribution = contribution,
            status = "new"
        )
        self.transaction.save()


    def test_success_updates_payment_status(self):
        self.assertEqual(self.transaction.status, "new")
        request_parameters = {
            "checkout-account": "1234",
            "checkout-algorithm": "sha256",
            "checkout-amount": str(self.transaction.contribution.sum),
            "checkout-stamp": "foobar",
            "checkout-reference": "fizzbuzz",
            "checkout-transaction-id": self.transaction.checkout_transaction_id,
            "checkout-status": "ok",
            "checkout-provider": "BOB"
        }
        signature = calculate_hmac(request_parameters, PAYTRAIL_ACCOUNT_SECRET)
        request_parameters["signature"] = signature

        client = Client()
        response = client.get("/payments/success", request_parameters)
        self.assertEquals(response.status_code, 200)

