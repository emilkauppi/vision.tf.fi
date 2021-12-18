from django.urls import path
from . import views

urlpatterns = [
    path("export", views.export, name="export_donation"),
    path("groups", views.groups, name="groups_donation"),
    path("<int:contribution_id>/", views.donation, name="view_donation"),
    path("", views.index, name="index_donation")
]