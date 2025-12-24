# Home/views.py
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from .models import Contact

def test_form(request):
    """Super simple test form"""
    print("=" * 50)
    print(f"Method: {request.method}")
    print(f"POST: {request.POST}")
    print("=" * 50)
    
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        print(f"Received: {name}, {email}")
        messages.success(request, f"Got it! Name: {name}, Email: {email}")
        return redirect('test_form')
    
    return render(request, "test.html")


def add_contact(request):
    """
    Handle contact form submission and display home page
    """

    # ... rest of your code
    if request.method == "POST":
        # Get form data
        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        subject = request.POST.get("subject", "").strip()
        message_text = request.POST.get("message", "").strip()
        
        # Validate data
        if not all([name, email, subject, message_text]):
            messages.error(request, "Please fill in all fields.")
            return render(request, "home.html")
        
        try:
            # Create and save contact
            contact = Contact(
                name=name,
                email=email,
                subject=subject,
                message=message_text
            )
            contact.save()
            
            # Success message
            messages.success(request, f"Thank you {name}! Your message has been sent successfully. I'll get back to you soon.")
            print(f"✅ Contact saved: {name} - {email}")
            
            # Redirect to prevent form resubmission on refresh
            return redirect('add_contact')
            
        except Exception as e:
            # Error handling
            messages.error(request, "Sorry, something went wrong. Please try again.")
            print(f"❌ Error saving contact: {e}")
    
    # GET request - just show the page
    return render(request, "home.html")



# from django.shortcuts import render
# from django.http import HttpResponse
# from django.contrib import messages
# from Home import models
# from Home.models import Contact

# # Create your views here.

# # def home_view(request):
# #     return render(request, "home.html")

# def add_contact(request):
#     if request.method == "POST":
#         print("Post request received")
#         name = request.POST.get("name")
#         email = request.POST.get("email")
#         subject = request.POST.get("subject")
#         message = request.POST.get("message")
#         print(f"Name: {name}, Email: {email}, Subject: {subject}, Message: {message}")
#         contact = models.Contact(name=name, email=email, subject=subject, message=message)
#         contact.save()
#         messages.success(request, "Thank you for contacting us. Your message has been sent successfully.")
#         print("Data has been saved to the database.")
#     return render(request, "home.html")
