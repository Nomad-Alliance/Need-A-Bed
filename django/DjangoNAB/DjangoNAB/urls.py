"""DjangoNAB URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from NeedABedAPI.views import *

router = routers.SimpleRouter()
router.register('demographics', DemographicsViewSet)

router.register('survey', SurveyViewSet)

urlpatterns = [
    path('API/', include(router.urls), name='apibase'),
    path('API/locations/',locationsList.as_view(), name='locations'),
    path('admin/', admin.site.urls, name='admin'),
    path('NomadAlliance/statistics/', statistics_base, name='StatsBase'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "NAB Admin Panel"
admin.site.site_title = "NAB Admin"