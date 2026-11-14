from django.conf import settings
from django.db import models

class Department(models.Model):
    NAME_MAX_LENGTH = 255

    name = models.TextField(primary_key=True, max_length=NAME_MAX_LENGTH)

    def toDict(self):
        return {
            "name": self.name
        }