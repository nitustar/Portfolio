# Home/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.add_contact, name='add_contact'),  # Home page with contact form
    path('test-form/', views.test_form, name='test_form'),  # Test form URL
]