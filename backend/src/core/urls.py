from django.urls import path
from core import views

urlpatterns = [
    # authentication APIs
    path('login/', views.log_in_user, name='login'),
    path('logout/', views.log_out_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('current_user/', views.get_current_user, name='current_user'),

    # user_data APIs
    path('user_data/', views.get_user_data, name='user_data'),
    path('user_data_save/', views.save_user_data, name='save_user_data'),

    # character APIs
    path('character_overview/', views.get_character_overview, name='character_overview'),
    path('character/<character_id>', views.get_character, name='character'),
    path('character_save/<character_id>', views.save_character, name='save_character'),
    path('character_create/', views.create_character, name='create_character'),
    path('character_delete/<character_id>', views.delete_character, name='delete_character'),

    # convention APIs

]
