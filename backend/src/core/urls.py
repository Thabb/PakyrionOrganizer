from django.urls import path
from core import views

urlpatterns = [
    path('character/<user_id>', views.get_character, name='character'),
]
