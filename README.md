# Need A Bed

## Contacts for the project:

Technical Lead: Harrison

Email for project: harrison@nomadalliance.org

Product Ownwer: Kseniya

Email: kseniya@nomadalliance.org

Phone: +1 (801) 200-3573

Website: https://nomadalliance.org

Project Website: https://needabed.org

---

## Original Contributors from [Weber State University](https://weber.edu):

- Amanda Hansen
- [Matt Juarez](https://github.com/matthewjuarez1)
- [Vipenjit Singh](https://github.com/VSingh-0)
- [Cayden Schroader](https://github.com/CS-EDU921)
- [Braden Shipley](https://github.com/Bshiple)
- [Jaden Roskelley](https://github.com/croskelley1)

Special thanks to [Weber State University](https://weber.edu) and [Ted Cowan](https://github.com/tcowan) for their support.

---

## Development

### Tutorials:

### React Native: (frontend)

- https://app.pluralsight.com/library/courses/building-mobile-apps-react-native/table-of-contents
- https://app.pluralsight.com/library/courses/react-native-big-picture
- https://youtu.be/0-S5a0eXPoc

### Django: (backend)

- https://youtube.com/playlist?list=PLzMcBGfZo4-kQkZp-j9PNyKq7Yw5VYjq9
- https://youtube.com/playlist?list=PLXmMXHVSvS-DQfOsQdXkzEZyD0Vei7PKf

### Environment Setup:

Currently, we are utilizing python 3.8 or higher, and Node 18 or higher. Please install those on your own.

The setup/ directory contains scripts to install dependencies and build the project locally:
From the setup/ directory, run the commands as follows:

linux:

- $ ./linux-setup
- $ ./linux-test
- $ ./linux-start-servers

windows:

- .\windows-setup.ps1
- .\windows-test.ps1
- .\windows-backend-server.ps1
- .\windows-frontend-server.ps1

---

## Frontend: React Native

### Screens:

Screens are the screens that an app navigates through. They are located in react/screens directory.
It is important to note that the screens are named in the App.js file, so in order to navigate to the various screens, info will need to be declared there.

### Images

The images used are located in react/assets/images. Global names for the img src are declared in react/config/Images.js

### Frontend testing:

The frontend tests are found in \NeedABed\react\_\_tests\_\_

Run the tests in the terminal with npm run test

- https://reactnative.dev/docs/testing-overview
- https://www.softwaretestinghelp.com/testing-react-apps-using-jest/
- https://app.pluralsight.com/course-player?clipId=119793ae-3dd5-49d9-bd2d-52726341ce86
- https://www.digitalocean.com/community/tutorials/how-to-write-snapshot-tests-for-react-components-with-jest

---

## Backend: Django Workflow & Architecture:

### Databases:

Django defaults to working with a local SQLite database. Other databases can be set up with Django by altering the variables in Settings.py, including Postgresql and MySQL (https://docs.djangoproject.com/en/4.2/ref/databases/). As of now, we are simply using the default SQLite3 database.

### Models:

Django implements the Model class to emulate tables, as can be seen in Models.py. Inside the Model subclass, class variables can be named and assigned to types, which will emulate the different columns for a table. These variables can simulate character strings, integers, filepaths, and much more. Models can also support functions to be used on any particular instance of their class (meaning 1 record from the database). For a more comprehensive description of models and their features, see https://docs.djangoproject.com/en/4.2/topics/db/models/

(Note that the tables listed below are based off of classes defined in models.py, and are not accurate to how these tables are saved in SQL syntax)

### Tables:

Location:

Fields

- shelter_name : string
- street : string
- city: string
- state: string, restricted to those listed in STATE_CHOICES
- zipcode : string
- phone : string
- lon: float > Longitude decimal value of the location
- lat: float > Latitude decimal value of the location
- bed_count: integer > Meant to hold the current available beds
- capacity: integer > meant to hold the max Nomads a location can take in
- is_real: boolean > For development purposes, indicates this is a real location
- shelter_type:string, restricted to those listed in subclass ShelterType
- open_time: timefield > Time this location may start accepting nomads
- close_time: timefield > Time this location closes to nomads
  Subclasses and constants:
- STATE_CHOICES: List of tuples (abbreviation, full name), for the state field to choose from
- ShelterType: Subclass containing constants, which define the tuple choices for the shelter_choice field
  Table functions:
- **str** : Will return the “name” field of any particular instance on which the str() function is implicitly or explicitly called
- populate_coords(): will call the GeoApify API, send the instance’s address information, and receive back location information to populate the lon and lat fields with
  -     NOTE: GeoApify requires an API key, which is defined under settings.py as GEOAPIFY_KEY. This key may eventually expire and need to be replaced, but can be replaced with a new account for free.
  -     NOTE: This will not work if the address is fake/ generated.

Service:

Fields

- location: Many To Many connection > Will connect the Service table to the Location table, emulating a M:M relationship
- service_type: string > Indicates the service being provided
  Table functions
- **str** : WIll return the service_type when an instance is stringified.

Survey:

Fields

- nabbed_bed : bool > Indicates if the Nomad was able to get a bed
- no_room: bool > Nomad unable to get a bed due to capacity limitations
- no_show: bool > Nomad did not show up to the location
- not_liked: bool > Nomad did not feel comfortable at the location
- unwelcome: bool > Nomad felt unwelcome at the location
- feedback: string > Nomad’s detailed feedback

Demographics:

Fields:

- user_key: Binary field > Identifies a user while preserving anonymity
- gender: Integer > restricted to the choices defined in Gender
- veteran: bool > Nomad is a veteran
- pregnant: bool > Nomad is pregnant
- victim_dv: bool > Nomad is a victim of domestic violence
- lgbtq : bool > > Nomad is lgbtq
- custodian: bool > Nomad has children in their care
- dog: bool > Nomad has a dog with them
- poc:bool > Nomad is a person of color
- disabled:bool > Nomad is disabled
- esl:bool > Nomad’s first language is not english
- deaf:bool > Nomad is deaf
  Subtables:
- Gender: Contains enumeration of integer keys, correlating to Male, Female or Non-Binary
  Functions:
- create_validate_key(key_str): takes the User’s IP address and client ID as a single string, then encodes them into a unique ID to identify this user and avoid duplicate data. The IP address and Client ID will not be saved by themselves.

Tests:
Django comes with a prebuilt test.py file under the individual application’s directory. For example, the tests for the backend are located under django/DjangoNAB/NeedABedAPI/tests.py. These tests are used to validate the models in models.py. A test class is set up, and each class can have multiple tests defined inside. The tests can be run via command in the root directory of the backend, django/DjangoNAB:

    python manage.py test

Currently, there is a github workflow setup to run tests on the backend each time there is a push/pull request to the main branch. For more information on django tests, see https://docs.djangoproject.com/en/4.2/topics/testing/overview/

Views:
In Django, views.py contains functions and classes meant to carry out the logic behind the URL that links to them, defined in urls.py. This can be anything from accessing a page to requesting data.See more about views in general at: https://docs.djangoproject.com/en/dev/topics/http/views/
In the NAB app, Views are used in the backend to display statistics, and in the frontend to request data for the app.
The NAB app makes use of the Django REST framework, which uses ViewSets, ListAPIViews and Serializers in tandem with Views to make the logic work. Information about these can be found at:

- https://www.django-rest-framework.org/api-guide/viewsets/
- https://www.django-rest-framework.org/api-guide/generic-views/
- https://www.django-rest-framework.org/api-guide/serializers/

  URLs and Views:
  View: locationsList:
  URL: API/locations/<query_string>

  - locationsList is a ListAPIView. It expects some kind of query string from the frontend to determine which shelters to return to the end user. It does this by checking each possible field, and filtering the results based off of that. If, for whatever reason, the end result is an empty set, locationsList will simply return all locations. A Demographics instance will be created based off the data given in the request, and saved before the view returns.

View: statistics_base:
URL: NomadAlliance/statistics/

-     statistics_base is a more traditional view, which requires a login to access. It will count up the occurrences of various demographic attributes and send render them with the demographics.html file. This will show as a few nicely colored charts in the browser.

View: SurveyViewSet:
URL: API/survey/

-     SurveyViewSet uses the Django REST framework’s default API page to display a collection of records from the Survey table. These results may not be able to be filtered through the URL as they could be with a ListAPIView. Extra data could also be posted to this page, and the format can be changed into a JSON response.

View: DemographicsViewSet:
URL: API/demographics/

-     DemographicsViewSet uses the Django REST framework’s default API page to display a collection of records from the Demographics table. These results may not be able to be filtered through the URL as they could be with a ListAPIView. Extra data could also be posted to this page, and the format can be changed into a JSON response.

Serializers:
Serializers are rather self explanatory once you look at the code. The serializers class will take a model and list of fields inside its Meta subclass. The fields list will be used to determine what fields from the Model should be returned via the API. This is also where you may format the data outside the Meta class before it is returned. For more information, see: (https://www.django-rest-framework.org/api-guide/serializers/ )
Factories:
Factories were used in NAB solely for development purposes. They give instructions on how to procedurally generate an record of a particular table. To learn more, see:
( https://factoryboy.readthedocs.io/en/stable/orms.html#django )
Be warned that, due to the very indirect nature of the documentation, making this work was quite possibly the most tedious part of development. There exists predefined factory functions with little documentation, leaving us to use the more basic options most often.
Currently, there are 3 ways we used the factory class to generate records:

FuzzyChoice:
EX. variable = factory.fuzzy.FuzzyChoice(choices=[‘a’,’b’,’c’]) - LazyChoice is part of the fuzzy package, it will take an argument of ‘choices’, which needs to be a list of things to choose from. If you need every single procedurally generated record to have the same value, setting that variable to FuzzyChoice(choices=[‘onlychoice’]) seems to work. The choices that can be derived from models.py seem to be difficult to work with in FuzzyChoice.
LazyFunction:
EX. def get_var():
Return random.randint(7,16)
…
variable = factory.LazyFunction(get_var)

- LazyFunction works a lot like a delegate in other languages. The function named must not have the parenthesis at the end, and can either be a function defined elsewhere, or a lambda function. For each generated record, this function will be called, so ensure it is efficient
  LazyAttribute:
  EX. @factory.lazy_attribute
  Def variable_name(self):
  Return “randomly generated variable” - LazyAttribute can be used as a decorator for a factory function. Functions very similar to LazyFunction, but can be defined inside the factory class instead of outside. The function name must match that of the variable you are trying to assign, and the value it returns is what will be assigned to that variable

Commands:
Commands can be run from the terminal via: python manage.py <commandName>. These commands will use the factories defined above to generate records. However, they can be used to do a whole host of other tasks. Learn more about commands here: ( https://docs.djangoproject.com/en/4.2/howto/custom-management-commands/ )

populatedems
Usage: python manage.py populatedems - This command will delete all the old records of demographics and generate more to replace them using the demographics factory. The NUM_DEMS variable dictates how many demographics records will be generated

populatelocations
Usage: python manage.py populatelocations - This command will will delete all the old records of locations whose value for the “is_real” variable was False. Meaning any real locations you put in manually will not be deleted. It will then generate more records with the Location factory, according to the value of NUM_LOCS. All of these new locations will have a “is_real” value of False. Each shelter will be randomly assigned services to provide.

---

## Setup/ “gotchya’s”:

React Native, for some reason, doesn't like it if you use the localhost to call django.
This means you will have to start django with
python manage.py runserver 0.0.0.0:8000
and put your IP address in the ALLOWED_HOSTS list in settings.py

Example:
My IP Address: 1.2.3.4

In settings.py:
ALLOWED_HOSTS =
[...
'1.2.3.4'
...]

Start Django Server with:
python manage.py runserver 0.0.0.0:8000

In React Native:
fetch('http://1.2.3.4:8000/API/<query stuff>')

---

### To Do’s:

- Add some language in a consent form that says we will store some information, even if that information is anonymous
- Add a screen asking for gender (Male/Female/NonBinary/Prefer not to say)
- Update the app to get data from HMIS when NAB is able to get access
- Change "DV Victim" to "Are you in danger?" or something less specific, and have it pull up a list of hotlines.
- Adam (our contact developing a similar app) said to get help from a women's shelter on how to ask that question.
- Styling needs to be dynamic based on screen size (i.e. android vs apple)
- The manual address input, could we have the street address be optional? Could we remove the state (cause it’s just utah for now, we can always add state option later yes), and add county and/or zip code, with the option to just input one if needed?
- The “We would love to hear about experience” option could you add the following and maybe an optional comment box after each question?
  - Felt unsafe / threatened? Comments
  - Were you assaulted?
    Comments
  - Did you lose any possessions during your stay?
    Comments
  - Was the staff respectful (or perhaps friendly? Kind? Whichever you guys choose )
  - Please vote 1-10 on staff friendliness (My board suggested maybe a 1-10 option, might be to late for this)
  - Comments / detail what happened (or however you’d like to encourage them to provide more details)

### Meeting Notes:

Notes from the meeting 1/2:
TL;DR - The HMIS database does provide real-time data, but that data is only as "real-time" as providers can report (this sometimes takes a couple hours). We would need to request/be approved to use the DB. HMIS is also not used by every provider. There are also struggles with displaying the true number of beds, becase it is first come first serve, and they don't want our app to seemingly promise beds that aren't actually there.

First off, a man named Joseph Jensen is a data manager for HMIS Utah. He confimred that HMIS does show data real time, not just weekly. He said they already have a Bed Management dashboard for providers to use, and mentioned we might be able to make it public facing somehow. He mentioned that in order for us to get access to HMIS, a formal request would have to be sumbitted and approved. He said we might be able to get access to the HMIS test DB easier though. He also said that if we cannot gain access, he would be able to provide us the DB schema somehow (i.e. he would give us the column names and data types so we could create our own mock HMIS DB). He sent an email to Kysenia, and would like to try and meet with us as a team to discuss the more technical details.

Although Joseph confimred that HMIS shows real-time data, this is limited by how quickly a provider can update the info in HMIS. Sometimes it might take a staff member two hours to get hundreds of people into a bed, and so if someone were to look at the app in that 2 hours, it might show a large number of avaliable beds, but really there are none.

Notes from the meeting 2/2:
Some background on how it works:
There are 3 HRC Shelters, with a combined total of 700 beds. On any given night, about 7PM, they do a bed refresh. They see how many beds have opened up since the prior day (most Nomads can keep reserving the same bed over and over, so if they don't, the bed becomes avaliable). Then they see how many people they have in their lobby. Many times there are more people in the lobby than beds. Then they finally update HMIS. They said that typically, they only have 7-10 "open" beds on a given night, and the people already in their lobby at 7pm have dibs. They did say that in the past, they tried to make "referal beds": HRCs would keep 5 beds reserved for those that called the shelter to reserve one. HRC would ask them to be there at 7pm, but the Nomads would only make it 30-50% of the time. They basically shot down anything like a reservation system in the app. Which isn't exactly what we were planning on anyway, but it likely wouldn't work. Someone asked about implementing something for the shelter staff to just quickly update a bed status to "pending", so if it takes them two hours to update HMIS, HMIS doesn't show the bed online while it is in the "pending" status. But sometimes the staff is 5 people, and 400 nomads, and if they had to take 30 seconds per person to update the bed status, that would be too intensive

Notes from 2/21/23:
First of all, we will be presenting the application to the whole class on March 14th, and it will be in person.

The things we will focus on this sprint are:
-Setup our database: table for demographic info and table for location
-Make the app look a little nicer, including implementing forms
-Implement testing
-Implement localization

We discussed that we can each just continue focusing on the thing we researched. For example, Amanda researched testing, so Amanda will be working on implementing that testing. If you are opposed to implementing the thing you researched, please reach out so we can assign a different task.

Notes from 2/23/23:
-Matt did some work on the backend and we can now post and fetch data
-Jaden will make some tasks in Jira for the sprint. Try and start as soon as you can.
-We will plan on just doing group check-ins on Tuesday/Thursday for the next couple weeks. Just make sure to post where you're at with your ticket by 8:00PM on those nights. This way the group will all be aware of what is going on. Post your updates in the check-ins channel.
-Jaden will update the group with more info about 211 when he hears back from Harrison and/or Kysenia

Notes from meeting with Adam Fordham (he is currently working with Salt Lake County to create a secure information storage app, basically the demographic information we gather would/could potentially be stored via their app. They have been working on it for the last 3.5 years and he had some insights to share.) The main points:
-He will try and reach out to some contacts with the 211 to see how we can go about using their data BUT it will probably take some time.
-He said that he thinks it would be good for us to just create a database of the 4-5 largest shelters to use for a demo (which I let him know we were already planning on)
-He said that we shouldn't give up on getting access to a bed count via HMIS, but that there are a lot of regulations that go into how and why the data is accessed and by whom.

Basically, it boils down to: it will take time and follow ups to get access to the things we want to. Making our own database with small samples will still be a good focus. He did also mention that, since things will likely take time, if we were to hand this project off to Ted for his students in the fall, that we would really want to nail down the basic framework/requirements/how the app will actually be run so that the team that picks it up doesn't have to basically start from scratch. I will keep the team posted when he gets back with info about the 211.

Notes from meeting on 3/30:
-Wants a bed count to display on the map (maybe in the marker description)
-Wants the bed count on the admin stats page
-Need some language in a consent form that says we will store some information, even if that information is anonyms
-I realized it isn't asking them for their gender, so we need a screen for that
-Update shelter info with real shelter data, including a bed count that we can just choose (columns can be from her google sheet, maybe a column for shelter type e.g. warming center, detox center. column for opening/closing time for queues.)
-Change "Shelter" to "Find a Bed" or something. Change "DV Victim" to "Are you in danger?" or something less specific, and have it pull up a list of hotlines or something different. Adam said to get help from a women's shelter on how to ask that question though.
-Wants text font size to be bigger
