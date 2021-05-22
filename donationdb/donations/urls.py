from django.urls import path
from . import views

urlpatterns = [
    path("<int:donation_letter_id>/", views.donation, name="view_donation"),
    path("", views.index, name="index_donation")
]