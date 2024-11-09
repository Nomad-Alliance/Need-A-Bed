from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, filters, generics
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import locationsSerializer, SurveySerializer, DemographicsSerializer
from .models import Location, Service, Survey, Demographics

import json

# Create your views here.


# This is the main view you will be using in the app
# This will take the query string and filter through it to
# find shelters that fit with the individual
class locationsList(generics.ListAPIView):
    serializer_class = locationsSerializer
    def get_queryset(self):
        # Getting user information for demographic user key
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = self.request.META.get('REMOTE_ADDR')
        # End User Key logic

        dem = Demographics()
        locs = Location.objects.all()
        end_locs = Location.objects.none()
        svcs = Service.objects.all()
        # Begin getting values for query string arguments
        # gen = eval(self.request.query_params.get('gender')) > locations table doesn't include a gender field yet
        lgbtq = eval(self.request.query_params.get('LGBTQ'))
        dvv = eval(self.request.query_params.get('Victim_DV') or None)
        custody = eval(self.request.query_params.get('Children'))
        pregnant = eval(self.request.query_params.get('Pregnant'))
        dog = eval(self.request.query_params.get('Dog'))
        vet = eval(self.request.query_params.get('Veteran'))
        real = eval(self.request.query_params.get('Real'))
        # End value parsing

        # Begin Filtering shelters based on query values
        #if gen:
         #   Functionality not yet added

         # 
        if lgbtq:
            dem.lgbtq = True
            #assets.objects.filter(project__name__contains="Foo")
            end_locs |= locs.filter(service__service_type__in=['LGBTQ'])
        if dvv:
            dem.victim_dv = True
            end_locs |= locs.filter(service__service_type__in=['Domestic Violence Victim'])
        if custody:
            dem.custodian = True
            end_locs |= locs.filter(service__service_type__in=['Custody Of Children'])
        if pregnant:
            dem.pregnant = True
            end_locs |= locs.filter(service__service_type__in=['Pregnant'])
        if dog:
            dem.dog = True
            end_locs |= locs.filter(service__service_type__in=['Dog'])
        if vet:
            dem.veteran = True
            end_locs |= locs.filter(service__service_type__in=['Veteran'])
        if real:
            end_locs = end_locs.filter(is_real=True)
        # end query value filtering

        # Getting the key to assign to user ID
        key = dem.create_validate_key(ip + self.request.headers['User-Agent'])
        print(key)
        if key:
            dem.user_key = key
            dem.save()
        dem.save()
        print('===Demographics should have saved ================')
        # If the filtered locations are not empty, ensure no duplicates
        # Otherwise just return all locations
        if end_locs:
            end_locs = end_locs.distinct()
        else:
            end_locs = locs
        return end_locs




@login_required(login_url='/admin/')
def statistics_base(request):
    q = Demographics.objects.all()
    gMale = q.filter(gender=1).count()
    gFemale = q.filter(gender=2).count()
    gNonBin = q.filter(gender=3).count()
    v = q.filter(veteran=True).count()
    p = q.filter(pregnant=True).count()
    vdv = q.filter(victim_dv=True).count()
    lgbtq = q.filter(lgbtq=True).count()
    c = q.filter(custodian=True).count()
    dog = q.filter(dog=True).count()
    poc = q.filter(poc=True).count()
    d = q.filter(disabled=True).count()
    esl = q.filter(esl=True).count()
    deaf = q.filter(deaf=True).count()
    context = {
        'q': q,
        'gMale': gMale,
        'gFemale': gFemale,
        'gNonBin': gNonBin,
        'v': v,
        'p': p,
        'vdv': vdv,
        'lgbtq': lgbtq,
        'c': c,
        'dog': dog,
        'poc': poc,
        'd': d,
        'esl': esl,
        'deaf': deaf,
    }
    return render(request, 'admin/demographics.html', context)

class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer

class DemographicsViewSet(viewsets.ModelViewSet):

    queryset = Demographics.objects.all()
    serializer_class = DemographicsSerializer
    
