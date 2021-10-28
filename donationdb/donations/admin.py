from django.contrib import admin
from .models import Donation, DonationLetter, Donor, Organization

# Register your models here.
admin.site.register(Donation)
admin.site.register(DonationLetter)
admin.site.register(Donor)
admin.site.register(Organization)
