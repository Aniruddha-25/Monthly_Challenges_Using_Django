from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("<str:month>/", views.monthly_challenge, name="monthly_challenge"),
]
