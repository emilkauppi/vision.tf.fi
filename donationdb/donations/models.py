from django.db import models

class Donation(models.Model):
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
    payment_date = models.DateTimeField()
    donation_sum = models.DecimalField(max_digits=12, decimal_places=2)
    donation_visibility = models.TextField(choices=VISIBILITY_CHOICES)
    pseudonym = models.TextField(blank=True)
    group_name = models.TextField(blank=True)
    greeting = models.TextField(blank=True)
    is_paid = models.BooleanField(default=False)

    # Generated donation letter as PDF
    pdf = models.BinaryField()

    # Form data as JSON
    form_data = models.JSONField()

    # For reference
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}: {self.donation_sum} € ({self.created_at.date()})"
