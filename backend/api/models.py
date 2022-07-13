from curses.ascii import NUL
from itertools import count
from django.db import models
from django.contrib.auth.models import AbstractUser,UserManager

# Create your models here.


class CustomUser(AbstractUser):
    mobileNo=models.BigIntegerField(blank=True,null=True,unique=True)
    otp=models.BigIntegerField(blank=True,null=True)
    failedLoginCount=models.IntegerField(blank=True,null=True,default=0)
    lastFailedLoginTime=models.DateTimeField(blank=True,null=True)
    objects = UserManager()
