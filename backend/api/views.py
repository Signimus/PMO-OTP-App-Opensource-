# Create your views here.
from datetime import datetime
from datetime import timedelta
import pytz
from distutils.log import error
from logging import exception
from rest_framework.response import Response
from rest_framework import status,views
from django.http import JsonResponse
from . models import CustomUser
import re,math,random
from django.conf import settings
from django.core.mail import send_mail
from django.contrib import messages, auth
from .models import CustomUser
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

# Create your views here.

def home(request):
    return JsonResponse({'info': 'django react',})


def generateOTP() :
 
    # Declare a digits variable 
    # which stores all digits
    digits = "0123456789"
    OTP = ""
 
   # length of password can be changed
   # by changing value in range
    for i in range(4) :
        OTP += digits[math.floor(random.random() * 10)]
 
    return OTP


  
def isValid(mobileNo):
      
    Pattern = re.compile("(0|91)?[7-9][0-9]{9}")
    k = Pattern.match(mobileNo)
    if ((k)): 
        return True     
    else :
        return False


otp= generateOTP()


class signUp(views.APIView):
    def post(self,request):
        try:

            data=request.data
            email=data.get('email',None)
            mobileNo=data.get('mobileNo',None)
            if(isValid(str(mobileNo))==True):
                username=data.get('username',None)
                password=data.get('username',None)
                confirm_password=data.get('username',None)
                if password!=confirm_password:
                    return  Response({"error":"password not match"},status=status.HTTP_400_BAD_REQUEST)

                else:
                    user = CustomUser.objects.create_user(username=username,email=email,password=password,mobileNo=mobileNo)
                    user.save()
                    subject = 'Welcome to Signimus world'
                    message = f'Hi {user.username}, thank you for registering in Signimus.'
                    email_from = settings.EMAIL_HOST_USER
                    recipient_list = [user.email, ]
                    send_mail( subject, message, email_from, recipient_list )
                    return Response({"msg":"user is created"})
            else:
                return Response({"error":"mobile no is not valid"})
        except exception as e:
            return Response({"msg":e})



class SendOtp(views.APIView):
    def post(self,request):
        try:
            data= request.data
            Username= data.get("username",None)
            user_email=CustomUser.objects.get(username=Username)
            email=user_email.email
            subject = 'Otp varification'
            message = f'Hi {Username}, your opt is {otp}'
            useropt=user_email.otp=otp
            user_email.save()
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [email]
            send_mail( subject, message, email_from, recipient_list )

            return Response({"message":"opt send successfully"})

        except exception as e:
             return Response({"msg":e})
#we neeed to re write

class LoginView(views.APIView):
    def post(self, request):
        try:
            data = request.data
            Opt = data.get('otp', None)
            username=data.get('username',None)
            user_name=CustomUser.objects.get(username=username)            
            dataBaseOtp=user_name.otp
            count=user_name.failedLoginCount
            waitingTime=user_name.lastFailedLoginTime
            currentTime=datetime.utcnow()
            # currentTime.replace(tzinfo=utc)
            # waitingTime.replace(tzinfo=utc)

            if(int(Opt)==dataBaseOtp):
                print(waitingTime,"these is waiting time")
                print(currentTime,"these is current")
                # if(waitingTime<=currentTime):
                Username=user_name.username
                password=Username
                count=user_name.failedLoginCount=0
                user_name.save()
                user = auth.authenticate(username=Username, password=password)
                if user is not None:
                    auth.login(request, user)
                    res={"mes":"you are authorized"}
                    return JsonResponse(res)            
                else:
                    messages.warning(request, 'invalid credentials')
                    return Response ({'error': False},status=status.HTTP_400_BAD_REQUEST)
                # else:
                #     return Response({"message":"wait for 5 min"})
            else:
                if(count==0):
                    faildCount=user_name.failedLoginCount=1
                    user_name.save()
                if(count==1):
                    faildCount=user_name.failedLoginCount=2
                    user_name.save()
                if(count==2):
                    faildCount=user_name.failedLoginCount=3
                    user_name.save()
                if(count==3):
                    waitingTime=user_name.lastFailedLoginTime=datetime.utcnow() + timedelta(minutes=2)

                    user_name.save()
                    return Response({"eorror":"you made more than 3 attemp and you have to wait 5 min"})
    
                return Response({"error":"Otp is not vailid"})

        except exception as e:
            return Response({"msg":e})

            



def logout_user(request):
    logout(request)
    return redirect('home')