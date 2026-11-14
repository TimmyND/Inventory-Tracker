from django.conf import settings
from django.db import models
from inventoryTracker.department.models import Department
import uuid


class Product(models.Model):
    NAME_MAX_LENGTH = 255

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(max_length=NAME_MAX_LENGTH)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def toDict(self):
        return {
            "id": self.id,
            "name": self.name,
            "department": self.department.toDict(),
            "created_at": self.created_at
        }