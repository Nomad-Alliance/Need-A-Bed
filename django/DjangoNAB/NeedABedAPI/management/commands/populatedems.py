import random

from django.db import transaction
from django.core.management.base import BaseCommand

from NeedABedAPI.models import Demographics
from NeedABedAPI.factories import DemographicsFactory

#-----------------------------------------------------------
#   This file, populatedems.py, is responsible for  
#   generating fake demographic records to populate the DB with.
#
#   USAGE:
#   python manage.py populatedems
#-----------------------------------------------------------

# Determines how many Demographic records will be created
NUM_DEMS = 20


class Command(BaseCommand):
    help = "Generates test data"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        models = [Demographics]
        for m in models:
            m.objects.all().delete()

        self.stdout.write("Creating new data...")
        # Create NUM_DEMS Demographic records
        dems = []
        dem_instance = Demographics()
        for _ in range(NUM_DEMS):
            dem = DemographicsFactory()
            dems.append(dem)