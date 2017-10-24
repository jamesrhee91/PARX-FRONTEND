# PARX-FRONTEND

Crowd sourced mobile parking app made with React Native and Ruby on Rails for registering and finding vacant parking space.
Persists User's location when vacating a public parking space and allows for other Users to query for parking space around their current location or a given location.

**This app is currently in production and was not intended to be deployed for public use. App was made as a personal project to demonstrate my web/mobile development skills.**

## Made using
 - React Native for client side
 - Ruby on Rails for server side
 - PostgreSQL with PostGIS for data querying
 - Multiple React & React-Native libraries
 - Google Maps Directions API
 - Google Maps Geocoding API
 - Google Maps Javascript API
 - Google Maps SDK for IOS
 - Google Places API Web Service

## Getting started
1. Install react-native cli command
2. Install Xcode from the App store
3. Clone or download the repo and cd into the root folder
4. Run ```yarn install``` or ```npm install``` in your terminal
5. Run ```react-native run-ios``` to start the bundler and simulator



### Login / Signup
###### Login using your email address and password
![alt text](./assets/image/iphonelogin.gif)


### OR


###### Create an account by filling in the form categories
![alt text](./assets/image/iphonesignup.gif)



### Route to destination
###### When routing to a specific destination, the app will prompt the User to see if they are vacating a public parking space. If the User presses yes, the app will save their current geolocation. If no was pressed, the app will not save their location and the User will be routed to their destination.
![alt text](./assets/image/iphonedestination.gif)



### Find parking nearby
###### Pressing the action button opens up two new buttons labeled **Leaving** and **Find Parking**. When the User presses **Find Parking**, all available parking spaces within a 300m radius of the User's location will be shown on the map.
![alt text](./assets/image/iphonefindparking.gif)



### Search for parking
###### As an added feature, the User is able to search for a specific place and look for parking around the search location.
![alt text](./assets/image/iphonesearchparking.gif)


### Find parking at a given point
###### The User is also able to look for parking around a dropped pin by holding down anywhere on the map.
![alt text](./assets/image/iphonemarkersearch.gif)



### Leaving a parking space
###### When leaving a public parking space, the User is able to contribute their spot by pressing the **Leaving** button in the actions menu. Any parking space that is saved will automatically be erased from the database after 1 minute has passed.
![alt text](./assets/image/iphoneleavingbutton.gif)



### Recently saved locations
###### User's are able to look at their most recently saved locations and delete them if necessary.
![alt text](./assets/image/iphonerecent.gif)



## Issues
- Edit profile feature
- Settings feature
- Incentive system (Karma points/Tier)
- Async storage
