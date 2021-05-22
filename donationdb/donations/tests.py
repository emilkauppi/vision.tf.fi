import datetime
from django.contrib.auth.models import User
from django.test import Client
from django.test import TestCase
import json
import os
from .models import Donation

# Create your tests here.
class DonationViewTestCase(TestCase):
    def setUp(self):
        self.credentials = {
            "username": "testuser",
            "password": "secret"
        }
        User.objects.create_user(**self.credentials)

    def test_smoke_test_index_page(self):
        client = Client()
        client.login(username="testuser", password="secret")
        response = client.get("")
        print(response)
        self.assertEqual(response.status_code, 200)
