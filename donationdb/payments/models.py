from django.db import models
from donations.models import Contribution

class Payment(models.Model):
    transaction = models.CharField(max_length=50)
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

    def __str__(self):
        return f"{self.contribution} ({self.status})"
