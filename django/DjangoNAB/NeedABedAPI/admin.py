from django.contrib import admin
from .models import Location,Service, Demographics

# Models will need to be registered here to show up in the 
# Admin Dashboard

# Register your models here.
admin.site.register(Location)
admin.site.register(Service)
admin.site.register(Demographics)