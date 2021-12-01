from django.contrib.auth.models import User
from django.core.exceptions import ViewDoesNotExist
from django.test import Client
from django.test import TestCase

from donations.models import Contribution, Donor, Organization


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

        Contribution.objects.create(
            donor = pelle,
            organization = fonden,
            visibility = "visible",
            sum = 20000
        ).save()

        # Donor with visible name
        alice = Donor.objects.create(
            name = "Alice Virtanen",
            email = "alice@virtanen.foo"
        )
        alice.save()

        Contribution.objects.create(
            donor = alice,
            visibility = "visible",
            sum = 500
        ).save()

        # Donor with pseudonym
        xi = Donor.objects.create(
            name = "Xi Jinping",
            email = "xi@ping.pong",
            pseudonym = "Nalle Puh"
        )
        xi.save()

        Contribution.objects.create(
            donor = xi,
            visibility = "pseudonym",
            sum = 1000000
        ).save()

        # Anonymous donor
        bob = Donor.objects.create(
            name = "Bob Kexsson",
            email = "kexet@bob.ok"
        )

        Contribution.objects.create(
            donor = bob,
            visibility = "anonymous",
            sum = 50
        )


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