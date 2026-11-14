from django.db import IntegrityError, transaction
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from inventoryTracker.product.models import Product
from inventoryTracker.department.models import Department
from rest_framework.views import APIView

@permission_classes([AllowAny])
class Login(APIView):
    def post(self, request):
        # Get user info
        user = authenticate(username=request.data.get("username"), password=request.data.get("password"))
        if user is not None:
            response = {
                "success": True,
                "username": user.username,
                "email": user.email,
                "id": user.id,
                "token": Token.objects.get_or_create(user=user)[0].key,
                "is_moderator": user.is_staff
            }
            return Response(response, status=status.HTTP_200_OK)

        return Response({"success": False, "error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class Logout(APIView):
    def get(self, request):
        request.auth.delete()
        return Response({"success": True})