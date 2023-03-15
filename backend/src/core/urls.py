from django.urls import path
from core import views

urlpatterns = [
    path('character_list/<user_id>', views.get_character, name='character'),
    path('character_overview/<user_id>', views.get_character, name='character'),
]
