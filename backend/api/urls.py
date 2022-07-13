from django.urls import path
from . import views


urlpatterns = [
    path('',views.home,name='home'),
    path("signup/", views.signUp.as_view(), name="signup"),
    path("login/", views.LoginView.as_view(), name="login"),
    path('logout/', views.logout_user, name="logout"),
    path('sendopt/',views.SendOtp.as_view(),name='sendotp')
]