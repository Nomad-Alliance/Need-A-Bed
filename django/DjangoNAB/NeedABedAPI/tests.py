from django.test import TestCase
from .models import Location, Service


# python manage.py test
# Run the command in the line above to test

# This was just me making sure that testing would work as planned
# class ShelterExclusionaryFieldsTestCase(TestCase):

#     def setUp(self):
#         Shelter.objects.create(name='Vet', lon='41.1915', lat='111.1040', gen=1, vet=True, has_children=False)
#         Shelter.objects.create(name='Family', lon='41.1915', lat='111.1040', gen=1, vet=False, has_children=True)

#     def test_shelter_vet_status(self):
#         vet = Shelter.objects.get(vet=True)
#         fam = Shelter.objects.get(vet=False)
#         self.assertEqual(vet.__str__(), 'Vet')
#         self.assertEqual(fam.__str__(), 'Family')

#     def test_shelter_child_status(self):
#         children = Shelter.objects.get(has_children=True)
#         nochildren = Shelter.objects.get(has_children=False)
#         self.assertEqual(nochildren.__str__(), 'Vet')
#         self.assertEqual(children.__str__(), 'Family')


# # Fully testing the Shelter model
# class ShelterModelTest(TestCase):

#     def setUp(self):
#         self.shelter = Shelter.objects.create(
#             name='Test Shelter',
#             address='123 Test St',
#             lon=0.0,
#             lat=0.0,
#             gen=Shelter.Gender.MALE,
#             vet=True,
#             has_children=False,
#         )

#     def test_name_max_length(self):
#         max_length = self.shelter._meta.get_field('name').max_length
#         self.assertEquals(max_length, 50)

#     def test_address_max_length(self):
#         max_length = self.shelter._meta.get_field('address').max_length
#         self.assertEquals(max_length, 150)

#     def test_vet_boolean_field(self):
#         self.assertEqual(self.shelter.vet, True)
#         with self.assertRaises(Exception):
#             self.shelter.vet = 'gorss'
#             self.shelter.save()

#     def test_has_children_boolean_field(self):
#         self.assertEqual(self.shelter.has_children, False)
#         with self.assertRaises(Exception):
#             self.shelter.has_children = 'Gross'
#             self.shelter.save()

#     def test_shelter_str(self):
#         self.assertEqual(str(self.shelter), 'Test Shelter')


# Fully testing location model
class LocationTestCase(TestCase):
    def setUp(self):
        self.location = Location.objects.create(
            shelter_name='Test Shelter',
            street='123 Test St',
            city='Testville',
            state='UT',
            zipcode='84400',
            phone='1234567890',
        )

    def test_location_str(self):
        self.assertEqual(str(self.location), 'Test Shelter')

    def test_shelter_name_max_length(self):
        max_length = self.location._meta.get_field('shelter_name').max_length
        self.assertEquals(max_length, 50)

    def test_street_max_length(self):
        max_length = self.location._meta.get_field('street').max_length
        self.assertEquals(max_length, 50)

    def test_city_max_length(self):
        max_length = self.location._meta.get_field('city').max_length
        self.assertEquals(max_length, 20)

    def test_state_max_length(self):
        max_length = self.location._meta.get_field('state').max_length
        self.assertEquals(max_length, 2)

    def test_zipcode_max_length(self):
        max_length = self.location._meta.get_field('zipcode').max_length
        self.assertEquals(max_length, 9)

    def test_phone_max_length(self):
        max_length = self.location._meta.get_field('phone').max_length
        self.assertEquals(max_length, 15)

    def test_location_zipcode_default(self):
        self.assertEquals(self.location.zipcode, '84400')


# I was looking into testing that the max_length attribute was being enforced on the DB level, and it is NOT.
# There could be other potential options like overwriting certain methods like the clean() method.
# Leaving this here as an example for when we decide how to proceed
# def test_location_max_length(self):
# Test that fields with too long of a value are not saved
# with self.assertRaises(Exception):
#     self.location1.shelter_name = ""
#     self.location1.save()


class ServiceModelTest(TestCase):

    def setUp(self):
        self.location = Location.objects.create(
            shelter_name='Test Shelter',
            street='123 Test St',
            city='Testville',
            state='UT',
            zipcode='84400',
            phone='123-456-7890',
        )
        self.service = Service.objects.create(
            service_type='Test Service'
        )
        self.service.location.add(self.location)

    def test_location_relation(self):
        self.assertEqual(self.service.location.count(), 1)
        self.assertEqual(self.service.location.first().shelter_name, 'Test Shelter')

    def test_service_type_max_length(self):
        max_length = self.service._meta.get_field('service_type').max_length
        self.assertEquals(max_length, 50)

    def test_service_str(self):
        self.assertEqual(str(self.service), 'Test Service')
