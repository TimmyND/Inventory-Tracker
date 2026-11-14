from django.db import IntegrityError, transaction
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from inventoryTracker.product.models import Product
from inventoryTracker.department.models import Department
from rest_framework.views import APIView

class GetProductDetails(APIView):
    def get(self, request, product_id):
        # Get the product
        product = Product.objects.filter(id=product_id).first()
        if product is None:
            return Response({"success": False, "error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"success": True, "product": product.toDict()})

class UpdateProductDetails(APIView):
    def post(self, request, product_id):
        # Get the product
        product = Product.objects.filter(id=product_id).first()
        if product is None:
            return Response({"success": False, "error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get the new product details
        name = request.data.get("name") or product.name
        department = request.data.get("department") or product.department

        # Get the department
        if department != product.department:
            department = Department.objects.filter(name=department)
            if department is None:
                return Response({"success": False, "error": "Department not found"}, status=status.HTTP_404_NOT_FOUND)

        # Update the product details
        product.name = name
        product.department = department

        product.save()

        return Response({"success": True, "product": product.toDict()}, status=status.HTTP_200_OK)


class CreateProduct(APIView):
    def post(self, request):
        # Get the new product details
        name = request.data.get("name")
        department = request.data.get("department") or ""
        department = Department.objects.filter(name=department).first()

        # Ensure name and department are valid
        if len(name.strip()) == 0:
            return Response({"success": False, "error": "Name must be present"}, status=status.HTTP_400_BAD_REQUEST)
        elif department is None:
            return Response({"success": False, "error": "Cannot find department"}, status=status.HTTP_404_NOT_FOUND)

        # Create the product
        product = Product.objects.create(
            name=name,
            department=department
        )

        return Response({"success": True, "product": product.toDict()}, status=status.HTTP_201_CREATED)

class ListProducts(APIView):
    def get(self, request):
        # Get the products
        products = Product.objects.filter()
        if products is None:
            products = []

        return Response({"success": True, "products": [product.toDict() for product in products]})