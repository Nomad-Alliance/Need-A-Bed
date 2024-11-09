from django.db import models
from cryptography.fernet import Fernet
from DjangoNAB.settings import USER_ID_KEY, GEOAPIFY_KEY
import urllib.parse
import datetime
import requests
from django.utils.translation import gettext_lazy as gtl_

# Create your models here.



STATE_CHOICES = [
    ('AL', 'Alabama'),
    ('AK', 'Alaska'),
    ('AZ', 'Arizona'),
    ('AR', 'Arkansas'),
    ('CA', 'California'),
    ('CO', 'Colorado'),
    ('CT', 'Connecticut'),
    ('DC', 'Washington D.C.'),
    ('DE', 'Delaware'),
    ('FL', 'Florida'),
    ('GA', 'Georgia'),
    ('HI', 'Hawaii'),
    ('ID', 'Idaho'),
    ('IL', 'Illinois'),
    ('IN', 'Indiana'),
    ('IA', 'Iowa'),
    ('KS', 'Kansas'),
    ('KY', 'Kentucky'),
    ('LA', 'Louisiana'),
    ('ME', 'Maine'),
    ('MD', 'Maryland'),
    ('MA', 'Massachusetts'),
    ('MI', 'Michigan'),
    ('MN', 'Minnesota'),
    ('MS', 'Mississippi'),
    ('MO', 'Missouri'),
    ('MT', 'Montana'),
    ('NE', 'Nebraska'),
    ('NV', 'Nevada'),
    ('NH', 'New Hampshire'),
    ('NJ', 'New Jersey'),
    ('NM', 'New Mexico'),
    ('NY', 'New York'),
    ('NC', 'North Carolina'),
    ('ND', 'North Dakota'),
    ('OH', 'Ohio'),
    ('OK', 'Oklahoma'),
    ('OR', 'Oregon'),
    ('PA', 'Pennsylvania'),
    ('RI', 'Rhode Island'),
    ('SC', 'South Carolina'),
    ('SD', 'South Dakota'),
    ('TN', 'Tennessee'),
    ('TX', 'Texas'),
    ('UT', 'Utah'),
    ('VT', 'Vermont'),
    ('VA', 'Virginia'),
    ('WA', 'Washington'),
    ('WI', 'Wisconsin'),
    ('WV', 'West Virginia'),
    ('WY', 'Wyoming')
]


class Location(models.Model):
    shelter_name = models.CharField(max_length=50)
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=2,choices=STATE_CHOICES, default='UT')
    zipcode = models.CharField(max_length=9, default='84400') # Fix
    phone = models.CharField(max_length=15) # Fix

    lon = models.FloatField(default=0.0) # left -112.09451906383038 right -111.79542057216167
    lat = models.FloatField(default=0.0) # bottom 40.47318337944914, top 40.80144950264984
    bed_count =  models.IntegerField(default=0)
    capacity = models.IntegerField(default=50)
    is_real = models.BooleanField(default=True) # Only explicitly make false when using the factory
    
    class ShelterType(models.TextChoices):
      SHELTER = 'SH', gtl_('Shelter')
      WARMING_CENTER = 'WC', gtl_('Warming Center')
      DETOX_CENTER = 'DC', gtl_('Detox Center')
      YOUTH_SHELTER = 'YS', gtl_('Youth Shelter')
      WET_SHELTER = 'WT' , gtl_('Wet Shelter')
      FAMILY_SHELTER = 'FS', gtl_('Family Shelter')
      WOMENS_SHELTER = 'WS', gtl_("Women's Shelter")
    
    shelter_type = models.CharField(max_length=2,choices=ShelterType.choices, default=ShelterType.SHELTER)
    open_time = models.TimeField(blank=True,default=datetime.time(9,0,0))
    close_time = models.TimeField(blank=True,default=datetime.time(21,0,0))


    def __str__(self):
      return self.shelter_name
    


    def populate_coords(self):
        base_add = "https://api.geoapify.com/v1/geocode/search?text="
        key_format_query = "&format=json&apiKey=" + GEOAPIFY_KEY
        full_add = self.street + ', ' + self.city + ' ' + self.state + ', ' + str(self.zipcode)
        address_query = urllib.parse.quote(full_add)
        url_f = base_add + address_query + key_format_query
        import requests
        r = requests.get(url_f)
        if r.status_code != 200:
            return False

        print(r.text + "Hello")
        r = r.json()
        self.lon = r.get("results")[0].get("lon")
        self.lat = r.get("results")[0].get("lat")
        self.save(update_fields=["lon","lat"])

        return True


    def populate_coords(self):
        base_add = "https://api.geoapify.com/v1/geocode/search?text="
        key_format_query = "&format=json&apiKey=" + GEOAPIFY_KEY
        full_add = self.street + ', ' + self.city + ' ' + self.state + ', ' + str(self.zipcode)
        address_query = urllib.parse.quote(full_add)
        url_f = base_add + address_query + key_format_query
        
        r = requests.get(url_f)
        if r.status_code != 200:
            return False

        #print(r.text + "Hello")
        r = r.json()
        self.lon = r.get("results")[0].get("lon")
        self.lat = r.get("results")[0].get("lat")
        self.save(update_fields=["lon","lat"])

        return True


class Service(models.Model):

    location = models.ManyToManyField(Location)
    service_type = models.CharField(max_length=50)
    
    def __str__(self):
      return self.service_type

# Access a locations services via: locInstance.service_set.all()
# Access locations that offer a particular service through: serviceInstance.locations.all()


class Survey(models.Model):
    nabbed_bed = models.BooleanField(default=False)
    no_room = models.BooleanField(default=False)
    no_show = models.BooleanField(default=False)
    not_liked = models.BooleanField(default=False)
    unwelcome = models.BooleanField(default=False)
    feedback = models.CharField(max_length=500)


class Demographics(models.Model):
    user_key = models.BinaryField(max_length=50, default=b'none')
    class Gender(models.IntegerChoices):
        MALE = 1
        FEMALE = 2
        NONBINARY = 3
    gender = models.IntegerField(choices=Gender.choices, default=Gender.MALE)
    veteran = models.BooleanField(default=False)
    pregnant = models.BooleanField(default=False)
    victim_dv = models.BooleanField(default=False)
    lgbtq = models.BooleanField(default=False)
    custodian = models.BooleanField(default=False)
    dog = models.BooleanField(default=False)

    poc = models.BooleanField(default=False)
    disabled = models.BooleanField(default=False)
    esl = models.BooleanField(default=False)
    deaf = models.BooleanField(default=False)

    def create_validate_key(self, key_str):
        f = Fernet(USER_ID_KEY)
        # Using encrypt from parts instead of simple encrypt
        # to ensure it gets the same key back every time w/ same string
        token = f._encrypt_from_parts(
            bytes(key_str, 'utf-8'), 
            0,
            b'\xbd\xc0,\x16\x87\xd7G\xb5\xe5\xcc\xdb\xf9\x07\xaf\xa0\xfa')
        existing = Demographics.objects.all().filter(user_key=token)
        if existing:
            return False
        else:
            return token
        # Untested
