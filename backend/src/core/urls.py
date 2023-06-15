from django.urls import path
from core import views

urlpatterns = [
    # authentication APIs
    path('login/', views.log_in_user, name='login'),
    path('logout/', views.log_out_user, name='logout'),
    path('register/', views.register_user, name='register'),

    # character APIs
    path('character_overview/', views.get_character_overview, name='character_overview'),
    path('character/<character_id>', views.get_character, name='character'),
    path('character_save/<character_id>', views.save_character, name='save_character'),
    path('character_create/', views.create_character, name='create_character'),
    path('character_delete/<character_id>', views.delete_character, name='delete_character'),
]
