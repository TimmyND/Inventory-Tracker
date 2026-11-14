from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from inventoryTracker.product.models import Product

from .models import Report


"""class ReportPublicNoteTests(APITestCase):
    def setUp(self):
        self.owner = get_user_model().objects.create_user("owner", password="Testing987@")
        self.reader = get_user_model().objects.create_user("reader", password="Testing987@")
        self.public_note = Note.objects.create(user=self.owner, title="Shared", content="For everyone.", is_public=True)
        self.private_note = Note.objects.create(user=self.owner, title="Mine", content="Only for me.")

    def report(self, note_id, reason):
        return self.client.post(f"/notes/{note_id}/report/", {"reason": reason}, format="json")

    def test_report_a_public_note(self):
        pass

"""