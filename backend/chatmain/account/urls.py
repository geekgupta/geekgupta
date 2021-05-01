from knox import views as knox_views
from .views import LoginAPI,Login
from django.urls import path
from .views import RegisterAPI,Register
from django.urls import path

urlpatterns = [
    path('api/register/', Register.as_view(), name='register'),
    path('api/login/', Login.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]