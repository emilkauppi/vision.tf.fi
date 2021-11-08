from django.urls import path
from . import views

urlpatterns = [
    path("providers", views.providers, name="payment_providers"),
    path("transaction/<slug:transaction>/", views.transaction, name="payment_transaction")
]
