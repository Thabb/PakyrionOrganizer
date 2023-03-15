from django.urls import path
from core import views

urlpatterns = [
    path('character_overview/<user_id>', views.get_character_overview, name='character_overview'),
    path('character/<character_id>', views.get_character, name='character'),
    path('character_save/<character_id>', views.save_character, name='save_character'),
    path('character_create/', views.create_character, name='create_character'),
]
