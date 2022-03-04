from django.contrib import admin
from .models import Contribution, DonationLetter, Donor, Organization
import requests
import json
from donationdb.settings import TELEGRAM_BOT_URL,FUNDRAISING_PAGE_USERNAME

def telegram_request_body(sum_decimal_euros):
    return {
        "message": {
            "text": str(sum_decimal_euros),
            "from": {
                "username": FUNDRAISING_PAGE_USERNAME
            }
        }
    }

def post_request_to_telegram_webhook(sum):
    telegram_body = telegram_request_body(sum)
    telegram_body_json = json.dumps(telegram_body)
    telegram_response = requests.post(
        TELEGRAM_BOT_URL,
        headers = {
            **{
                "Content-Type": "application/json; charset=utf-8"
            }
        },
        data=telegram_body_json
    )
    return telegram_response

@admin.action(description='Send Telegram post of selected contributions')
def send_tg_post(modeladmin, request, queryset):
    for obj in queryset:
        post_request_to_telegram_webhook(obj.sum)



class ContributionAdmin(admin.ModelAdmin):
    actions = [send_tg_post]

# Register your models here.
admin.site.register(Contribution, ContributionAdmin)
admin.site.register(DonationLetter)
admin.site.register(Donor)
admin.site.register(Organization)
