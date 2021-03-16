from django.db import models

class DonationLetter(models.Model):
    VISIBILITY_CHOICES = [
        ["visible", "visible"],
        ["pseudonym", "pseudonym"],
        ["anonymous", "anonymous"]
    ]
    # Contact person
    first_name = models.TextField()
    last_name = models.TextField()
    email = models.EmailField()
    address = models.TextField()
    zip_code = models.TextField(max_length=5)
    city = models.TextField()
    country = models.TextField()

    # Potential organization
    organization_name = models.TextField(blank=True)
    organization_fo_number = models.TextField(blank=True)
    organization_address = models.TextField(blank=True)
    organization_zip_code = models.TextField(max_length=5, blank=True)
    organization_city = models.TextField(blank=True)
    organization_country = models.TextField(blank=True)

    # Donation details 
    payment_date = models.DateField()
    donation_sum = models.DecimalField(max_digits=12, decimal_places=2)
    visibility = models.TextField(choices=VISIBILITY_CHOICES)
    pseudonym = models.TextField(blank=True)
    groupName = models.TextField(blank=True)
    greeting = models.TextField(blank=True)

    # Generated donation letter as PDF
    donation_letter = models.BinaryField()

    # Form data as JSON
    form_data = models.JSONField()