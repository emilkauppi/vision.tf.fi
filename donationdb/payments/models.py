from django.db import models
from donations.models import ContributionSerializer
from donations.models import Contribution
from rest_framework import serializers


class Transaction(models.Model):
    checkout_transaction_id = models.CharField(max_length=50)
    checkout_reference = models.CharField(max_length=50, blank=True)
    STATUS_CHOICES = [
        ["new", "new"],
        ["ok", "ok"],
        ["fail", "fail"],
        ["pending", "pending"],
        ["delayed", "delayed"]
    ]
    status = models.TextField(choices=STATUS_CHOICES)
    contribution = models.ForeignKey(Contribution, blank=True, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["checkout_transaction_id"])
        ]

    def __str__(self):
        return f"{self.contribution} ({self.status})"


class TransactionSerializer(serializers.ModelSerializer):
    contribution = ContributionSerializer()

    class Meta:
        model = Transaction
        fields = ["checkout_transaction_id", "status", "contribution"]
