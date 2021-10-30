from django.contrib import admin
from .models import Contribution, DonationLetter, Donor, Organization

# Register your models here.
admin.site.register(Contribution)
admin.site.register(DonationLetter)
admin.site.register(Donor)
admin.site.register(Organization)
