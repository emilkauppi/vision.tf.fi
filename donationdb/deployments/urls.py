from django.urls import path
from . import views

urlpatterns = [
    path("promote", views.promote, name="deployments_promote"),
    path("", views.index, name="deployments_index")
]