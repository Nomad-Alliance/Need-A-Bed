import factory
import factory.fuzzy
from faker import Faker
from factory.django import DjangoModelFactory
from random_address import real_random_address, real_random_address_by_state
import random
import datetime

from .models import Demographics,Location, STATE_CHOICES

# This Factory is responsible for generating demographics.
# It has been kept relatively simple
class DemographicsFactory(DjangoModelFactory):
    class Meta:
        model = Demographics
    
    gender = factory.fuzzy.FuzzyChoice(choices=[1,2,3])

    veteran = factory.fuzzy.FuzzyChoice(choices=[True, False])
    pregnant = factory.fuzzy.FuzzyChoice(choices=[True, False])
    victim_dv = factory.fuzzy.FuzzyChoice(choices=[True, False])
    lgbtq = factory.fuzzy.FuzzyChoice(choices=[True, False])
    custodian = factory.fuzzy.FuzzyChoice(choices=[True, False])
    dog = factory.fuzzy.FuzzyChoice(choices=[True, False])

    poc = factory.fuzzy.FuzzyChoice(choices=[True, False])
    disabled = factory.fuzzy.FuzzyChoice(choices=[True, False])
    esl = factory.fuzzy.FuzzyChoice(choices=[True, False])
    deaf = factory.fuzzy.FuzzyChoice(choices=[True, False])


ADDRESS_SOURCE = Faker()

# Generates a shelter name with a generic "Shelter[number 1-100]" name
def generate_shelter_name():
    return 'Shelter' + str(random.randint(0,100))

# Faker does not provide documentation on how to reliably generate a number in
# (xxx) xxx-xxxx format, so this reformats it to fit
def fake_phone_number() -> str:
    full = ADDRESS_SOURCE.msisdn()[6:]
    formatted = full[:3] + '-' + full[3:]
    return f'(801) {formatted}'

# Generates longitide within the Salt Lake Area
def get_lon():
    ln = round(random.uniform(-112.094519, -111.795420), 6)
    return ln

# Generates latitude within the Salt Lake Area
def get_lat():
    lt = round(random.uniform(40.473183,  40.801449), 6)
    return lt

# Generates the available number of beds, with 50 being the default max
def get_bed_count():
    return random.randint(0,50)



# Factory responsible for generating Locations, much more complex than the Demographics factory
class LocationsFactory(DjangoModelFactory):
    class Meta:
        model = Location
    
    shelter_name = factory.LazyFunction(generate_shelter_name)
    # the street address will not be one found in Utah
    # Faker draws their real addresses from a handful of states, UT excluded
    street = factory.LazyFunction(ADDRESS_SOURCE.street_address)
    # Generates City limited to larger Utah cities
    city = factory.fuzzy.FuzzyChoice(choices=['Ogden', 'Provo', 'West Valley', 'Saint George', 'Salt Lake City', 'Logan'])
    # As this was first developed in UT for UT, this will be the only choice
    state =factory.fuzzy.FuzzyChoice(choices=['UT'])
    zipcode = factory.fuzzy.FuzzyChoice(choices=['84404', '84111', '84432', '84492', '84463'])
    phone = factory.LazyFunction(fake_phone_number)

    is_real = False

    bed_count = factory.LazyFunction(get_bed_count)

    lon = factory.LazyFunction(get_lon)
    lat = factory.LazyFunction(get_lat)
    # Factory does not allow for constants, as far as we've seen,
    #  so length 1 choices are the next best thing
    capacity = factory.fuzzy.FuzzyChoice(choices=[50])

    @factory.lazy_attribute
    def open_time(self):
        return datetime.time(random.randint(7,16),0,0) # Time between 7am and 4pm
    
    @factory.lazy_attribute
    def close_time(self):
        return datetime.time(random.randint(20,23),0,0) # Time between 8pm and 11pm
    
    @factory.lazy_attribute
    def shelter_type(self):
        tps = Location.ShelterType.choices
        ind = random.randint(0, tps.__len__()-1)
        ch = tps[ind][0]
        return ch
