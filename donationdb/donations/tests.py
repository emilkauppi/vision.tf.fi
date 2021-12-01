from django.contrib.auth.models import User
from django.test import Client
from django.test import TestCase

from donations.models import Contribution, DonationLetter, Donor, Organization
from payments.models import Transaction


# Create your tests here.
class DonationViewTestCase(TestCase):
    def setUp(self):
        self.credentials = {
            "username": "testuser",
            "password": "secret"
        }
        User.objects.create_user(**self.credentials)

        # Organizational donation
        pelle = Donor.objects.create(
            name = "Pelle von Svensson",
            email = "pellevs@fonden.fond"
        )
        pelle.save()

        fonden = Organization.objects.create(
            name = "Fondfonden"
        )
        fonden.save()

        fonden_contribution = Contribution.objects.create(
            donor = pelle,
            organization = fonden,
            visibility = "visible",
            sum = 20000
        )
        fonden_contribution.save()

        DonationLetter.objects.create(contribution = fonden_contribution).save()

        # Donor with visible name
        alice = Donor.objects.create(
            name = "Alice Virtanen",
            email = "alice@virtanen.foo"
        )
        alice.save()

        alice_contribution = Contribution.objects.create(
            donor = alice,
            visibility = "visible",
            sum = 500
        )
        alice_contribution.save()

        Transaction.objects.create(
            checkout_transaction_id = "1234",
            status = "ok",
            contribution = alice_contribution
        ).save()

        # Donor with pseudonym
        svensson = Donor.objects.create(
            name = "Xi Svensson",
            email = "xi@svensson.se",
            pseudonym = "Nalle Puh"
        )
        svensson.save()

        svensson_contribution = Contribution.objects.create(
            donor = svensson,
            visibility = "pseudonym",
            sum = 1000000
        )
        svensson_contribution.save()

        Transaction.objects.create(
            checkout_transaction_id = "1234",
            status = "ok",
            contribution = svensson_contribution
        ).save()

        # Anonymous donor
        bob = Donor.objects.create(
            name = "Bob Kexsson",
            email = "kexet@bob.ok"
        )

        bob_contribution = Contribution.objects.create(
            donor = bob,
            visibility = "anonymous",
            sum = 50
        )
        bob_contribution.save()

        Transaction.objects.create(
            checkout_transaction_id = "1234",
            status = "ok",
            contribution = bob_contribution
        ).save()

        # Unfinished transaction
        nastan = Donor.objects.create(
            name = "Karl Petter",
            email = "nastan@fardig.nu"
        )

        nastan_contribution = Contribution.objects.create(
            donor = nastan,
            visibility = "visible",
            sum = 800
        )
        nastan_contribution.save()

        Transaction.objects.create(
            checkout_transaction_id = "1234",
            status = "new",
            contribution = nastan_contribution
        ).save()


    def test_smoke_test_index_page(self):
        client = Client()
        client.login(username="testuser", password="secret")
        response = client.get("")
        print(response)
        self.assertEqual(response.status_code, 200)


    def test_all_donations_are_filtered(self):
        client = Client()
        response = client.get("/donations/all")

        self.assertEqual(response.status_code, 200)

        donations = response.json()
        self.assertEqual(donations, {
            "individuals": ["Alice Virtanen", "Nalle Puh"],
            "organizations": ["Fondfonden"]
        })