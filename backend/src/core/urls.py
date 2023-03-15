from django.urls import path
from core import views

urlpatterns = [
    path('character_overview/<user_id>', views.get_character_overview, name='character_overview'),
    path('character_list/<user_id>', views.get_character_list, name='character_list'),
]
