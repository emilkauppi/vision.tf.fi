from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="deployments_index")
]