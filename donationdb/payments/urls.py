from django.urls import path
from . import views

urlpatterns = [
    path("providers", views.providers, name="payment_providers"),
    path("success", views.success, name="payment_success"),
    path("transaction/<slug:transaction>/", views.transaction, name="payment_transaction"),
    path("transaction/<slug:transaction>/group", views.transaction_group, name="payment_transaction_group")
]
