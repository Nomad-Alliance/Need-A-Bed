from rest_framework import serializers
from .models import Location, Survey, Demographics


# These are the serializers 
# When sent back via the API, the fields list tells the API what
# Fields to send back allowing us to omit information if needed


class locationsSerializer(serializers.ModelSerializer):
    # Fields can also be formated before being returned with the API
    # As seen below, getting the human readable tag or formatting time
    # Is a great use for this
    open_time= serializers.DateTimeField(format="%H:%M")
    close_time = serializers.DateTimeField(format="%H:%M")
    shelter_type = serializers.CharField(source='get_shelter_type_display')
    class Meta:
        model = Location
        fields = ['id', 'shelter_name', 'street', 'state',
                  'city', 'zipcode', 'phone', 'bed_count',
                    'lon', 'lat', 'open_time', 'close_time', 'shelter_type']


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ['nabbed_bed', 'no_room', 'no_show', 'not_liked', 'unwelcome', 'feedback']


class DemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demographics
        fields = ['id', 'gender', 'veteran', 'victim_dv', 'lgbtq', 'custodian', 'dog', 'poc', 'disabled', 'esl', 'deaf']
