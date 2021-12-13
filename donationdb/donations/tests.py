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
            sum = 500,
            group_name = "TFS42"
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
            sum = 1000000,
            group_name = "TFS42"
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
            sum = 50,
            group_name = "TFS42"
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

        # Donor in another group
        fomppa = Donor.objects.create(
            name = "Fomppa Toffla",
            email = "fomppa@toffla.foo"
        )
        fomppa.save()

        fomppa_contribution = Contribution.objects.create(
            donor = fomppa,
            visibility = "visible",
            sum = 500,
            group_name = "Phux2100"
        )
        fomppa_contribution.save()

        Transaction.objects.create(
            checkout_transaction_id = "1234",
            status = "ok",
            contribution = fomppa_contribution
        ).save()

        # Donor without a group
        carl = Donor.objects.create(
            name = "Carl Felt",
            email = "carl@felt.foo"
        )
        carl.save()

        carl_contribution = Contribution.objects.create(
            donor = carl,
            visibility = "visible",
            sum = 500
        )
        carl_contribution.save()

        Transaction.objects.create(
            checkout_transaction_id = "1234",
            status = "ok",
            contribution = carl_contribution
        ).save()


    def test_smoke_test_index_page(self):
        client = Client()
        client.login(username="testuser", password="secret")
        response = client.get("")
        self.assertEqual(response.status_code, 200)


    def test_all_donations_are_filtered(self):
        client = Client()
        response = client.get("/donations/all")

        self.assertEqual(response.status_code, 200)

        donations = response.json()
        self.assertEqual(donations, {
            "donors": ["Alice Virtanen", "Carl Felt", "Fomppa Toffla", "Fondfonden", "Nalle Puh"]
        })


    def test_groups_contain_members(self):
        client = Client()
        response = client.get("/donations/groups")

        self.assertEqual(response.status_code, 200)
        groups = response.json()
        self.assertEqual(groups, [{
            "name": "Phux2100",
            "members": ["Fomppa Toffla"],
            "isMember": False
        }, {
            "name": "TFS42",
            "members": ["Alice Virtanen", "Nalle Puh"],
            "isMember": False
        }])
