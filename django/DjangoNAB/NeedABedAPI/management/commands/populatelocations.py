import random

from django.db import transaction
from django.core.management.base import BaseCommand

from NeedABedAPI.models import Location, Service
from NeedABedAPI.factories import LocationsFactory

#-----------------------------------------------------------
#   This file, populatelocations.py, is responsible for  
#   generating fake location records to populate the DB with.
#   Each instance created this way will be maked as not real
#   in the DB, and will be deleted next time this command is
#   used
#
#   USAGE:
#   python manage.py populatelocations
#-----------------------------------------------------------



# Determines how many locations will be generated
NUM_LOCS = 15

class Command(BaseCommand):
    help = "Generates test data"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        models = [Location]
        # The loop below will filter the Location table and delete fake records
        for m in models:
            m.objects.all().filter(is_real=False).delete()

        self.stdout.write("Creating new data...")
        # Create NUM_LOCS Locations
        locs = []
        loc_instance = Location()
        for _ in range(NUM_LOCS):
            dem = LocationsFactory()
            locs.append(dem)
        
        svcs = Service.objects.all()
        probs = [.5]*svcs.count() # 50% chance any shelter will have any service, can expand this
        
        # for loop to connect services to the newly created locations
        for l in locs:
            svc_index = 0
            for s in svcs:
                chance = random.random()
                if chance <= probs[svc_index]:
                    s.location.add(l)