const ip = '10.0.0.194'; // Change to your personal IP address, so react can make the call to the correct address
// Make sure this IP address is also in ALLOWED_HOSTS in the Django projects setting.py
const django_port = '8000'; // Django uses port 8000 by default. If you change that for whatever reason when running, change it here too

const REAL_LOCATIONS = true // If set to true, will exclude all procedurally generated (fake) locations

export function getSheltersAPI(form) {
  let formatted_url = `http://${ip}:${django_port}/API/locations/?`; // This URL path is not final, but it works for now
  // children , dog, lgbtq, pregnant, veteran, victim_dv
  if (form.Children) {
    formatted_url += 'Children=True&';
  } else {
    formatted_url += 'Children=False&';
  }
  if (form.Veteran) {
    formatted_url += 'Veteran=True&';
  } else {
    formatted_url += 'Veteran=False&';
  }
  if (form.LGBTQ) {
    formatted_url += 'LGBTQ=True&';
  } else {
    formatted_url += 'LGBTQ=False&';
  }
  if (form.Dog) {
    formatted_url += 'Dog=True&';
  } else {
    formatted_url += 'Dog=False&';
  }
  if (form.Pregnant) {
    formatted_url += 'Pregnant=True&';
  } else {
    formatted_url += 'Pregnant=False&';
  }
  if (form.Victim_DV) {
    formatted_url += 'Victim_DV=True';
  } else {
    formatted_url += 'Victim_DV=False';
  }
  if (REAL_LOCATIONS) {
    formatted_url += '&Real=True';
  } else {
    formatted_url += '&Real=False';
  }
  formatted_url += '&format=json';

  return formatted_url;
}
