"""
URL configuration for inventoryTracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from inventoryTracker.product import views as product_views
from inventoryTracker.auth import views as auth_views

urlpatterns = [
    path("login/", auth_views.Login.as_view(http_method_names=['post']), name="Login"),
    path("logout/", auth_views.Logout.as_view(http_method_names=['get']), name="Logout"),

    path("product/<uuid:product_id>", product_views.GetProductDetails.as_view(http_method_names=['get']), name="GetProductDetails"),
    path("product/<uuid:product_id>", product_views.UpdateProductDetails.as_view(http_method_names=['post']), name="UpdateProductDetails"),
    path("product/", product_views.CreateProduct.as_view(http_method_names=['post']), name="CreateProduct"),
    path("products/", product_views.ListProducts.as_view(http_method_names=['get']), name='ListProducts')
]
