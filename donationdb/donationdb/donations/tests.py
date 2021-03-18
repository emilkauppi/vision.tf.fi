import datetime
from django.test import Client
from django.test import TestCase
from .models import DonationLetter
import json

# Create your tests here.
class DonationViewTestCase(TestCase):
    def test_only_post_new_items(self):
        client = Client()
        response = client.get("/donations/new/")
        self.assertEqual(response.content.decode("utf-8"), "POST request expected")

    def test_non_json_post(self):
        client = Client()
        response = client.post("/donations/new/", content_type="text/xml", data="foobar")
        self.assertEqual(response.content.decode("utf-8"), "POST request expected JSON body")

    def test_individual_with_group_and_greeting(self):
        client = Client()
        response = client.post(
            "/donations/new/",
            content_type="application/json",
            data=individual_with_group_and_greeting()
        )
        self.assertEqual(response.status_code, 200)
        id = response.json()["id"]
        new_donation_letter = DonationLetter.objects.get(pk=id)

        self.assertEqual(new_donation_letter.first_name, "Svakar")
        self.assertEqual(new_donation_letter.last_name, "Teknolog")
        self.assertEqual(new_donation_letter.email, "svakar@teknolog.fi")
        self.assertEqual(new_donation_letter.address, "Otsvängen 22")
        self.assertEqual(new_donation_letter.zip_code, "02150")
        self.assertEqual(new_donation_letter.city, "Esbo")
        self.assertEqual(new_donation_letter.country, "Finland")
        self.assertEquals(str(new_donation_letter.payment_date.date()), "2021-03-30")
        self.assertEqual(new_donation_letter.donation_sum, 12345)
        self.assertEqual(new_donation_letter.donation_visibility, "visible")
        self.assertEqual(new_donation_letter.pseudonym, "")
        self.assertEqual(new_donation_letter.group_name, "Phux1882")
        self.assertEqual(new_donation_letter.greeting, "Det var bättre förr")
        self.assertEqual(new_donation_letter.form_data, json.loads(individual_with_group_and_greeting())["formData"])

        with open("donations/fixtures/individual_with_group_and_greeting.pdf", "rb") as file:
            pdf = file.read()
            self.assertEqual(new_donation_letter.pdf, pdf)

    def test_organization_no_group_no_greeting(self):
        client = Client()
        response = client.post(
            "/donations/new/",
            content_type="application/json",
            data=organization_no_group_no_greeting()
        )
        self.assertEqual(response.status_code, 200)
        id = response.json()["id"]
        new_donation_letter = DonationLetter.objects.get(pk=id)

        self.assertEqual(new_donation_letter.first_name, "Svakar")
        self.assertEqual(new_donation_letter.last_name, "Teknolog")
        self.assertEqual(new_donation_letter.email, "svakar@teknolog.fi")
        self.assertEqual(new_donation_letter.address, "Otsvängen 22")
        self.assertEqual(new_donation_letter.zip_code, "02150")
        self.assertEqual(new_donation_letter.city, "Esbo")
        self.assertEqual(new_donation_letter.country, "Finland")


        self.assertEqual(new_donation_letter.organization_name, "Teknologverksamhet AB")
        self.assertEqual(new_donation_letter.organization_fo_number, "1234567-8")
        self.assertEqual(new_donation_letter.organization_address, "Medelhavsgatan 14")
        self.assertEqual(new_donation_letter.organization_zip_code, "00220")
        self.assertEqual(new_donation_letter.organization_city, "Helsingfors")
        self.assertEqual(new_donation_letter.organization_country, "Finland")

        self.assertEquals(str(new_donation_letter.payment_date.date()), "2021-04-01")
        self.assertEqual(new_donation_letter.donation_sum, 1000)
        self.assertEqual(new_donation_letter.donation_visibility, "visible")
        self.assertEqual(new_donation_letter.pseudonym, "")
        self.assertEqual(new_donation_letter.group_name, "")
        self.assertEqual(new_donation_letter.greeting, "")
        self.assertEqual(new_donation_letter.form_data, json.loads(organization_no_group_no_greeting())["formData"])

        with open("donations/fixtures/organization_no_group_no_greeting.pdf", "rb") as file:
            pdf = file.read()
            self.assertEqual(new_donation_letter.pdf, pdf)


def individual_with_group_and_greeting():
    with open("donations/fixtures/individual_with_group_and_greeting.json") as file:
        content = file.readlines()
    return content[0]

def organization_no_group_no_greeting():
    with open("donations/fixtures/organization_no_group_no_greeting.json") as file:
        content = file.readlines()
    return content[0]