from django.urls import path
from . import views

urlpatterns = [
    path("<int:donation_letter_id>/", views.donation, name="view_donation"),
    path("<int:donation_letter_id>/donation_letter", views.donation_letter_download, name="donation_letter_download"),
    path("new/", views.new, name="new_donation"),
    path("", views.index, name="index_donation")
]