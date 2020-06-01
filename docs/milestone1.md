---
id: milestone1
title: "Milestone 1 🚀"
sidebar_label: Milestone 1
---

Proposed level of achievement: **Artemis**.

## Motivation
For a country of approximately 5.7 million people, the 75,655 donors in 2019&mdash;approx. 1.33%&mdash;was particularly
low.[^1] In fact, in 2019, the Singapore Red Cross and Health Sciences Authority appealed for blood donors as stocks
in blood banks reached low levels.[^2] Approximately 3,000 donors of any types were needed to restore the stocks to a 
healthy level. This shortage was grave as the blood group with the greatest extent of shortage was O, the universal group 
used in emergencies, particulary when the blood identity of the patient was unknown. The situation is exacerbated by
the fact that the number of young donors is declining at a steady rate, from about 23,000 in 2008 to 18,000 in
2019.[^1]<sup>,</sup>[^3] As the population is being increasingly dominated by senior citizens, and the current COVID-19
pandemic progresses, blood donors are needed more than ever.

When there is a lack of supply for a particular blood type in blood banks or hospital inventories, patients and families
turn to social media to look for blood donors. While this method may reach a myriad of potential donors, it is not 
always deterministic. There is also no guarantee that the potential donors are reachable, and this weakness in this 
method may be crucial in times of crisis. The Singapore Red Cross and HSA have a database of blood donors which are
contactable when blood supplies are needed. However, this system limits the coverage to only the regular registered
donors. Hence, we propose the development of a platform, **BloodConnect**, to connect blood donors and donees whenever,
wherever. BloodConnect allows users to create blood requests, which are viewable by other users as potential donors.
Nearby users will also be notified. If a user decides to donate to a request, they will be connected to the requester
and arrange a meeting at the hospital of request. Through this platform, we aim to bridge the gap between donors and 
donees and decrease the waiting time to find blood, particularly in emergencies.

[^1]: https://www.hsa.gov.sg/blood-donation/blood-facts-and-figures
[^2]: https://www.straitstimes.com/singapore/3000-blood-donors-needed-as-stocks-run-low
[^3]: https://www.tnp.sg/news/singapore/singapore-red-cross-concerned-over-lack-young-blood-donors

## Aim of project
To ensure consistent healthy supply of blood at bloodbanks and bridge the gap between blood donors and blood seekers, we
aim to develop a platform to provide information on blood requests and notify nearby potential donors to reduce the waiting
time for blood donations in emergency situations and encourage young donors through a relevant, digital platform with
the ease to search avenues for blood donations.

## User stories
* As a *blood donor*, I want to be able to see blood requests to which I can donate my blood.
* As a *blood donor*, I want to be notified when blood donation is required near my location.
* As a *blood seeker*, I want to be able to create a blood request with my contact details and connect with an eligible donor fast.
* As a *blood bank administrator*, I want to be able to create a blood request when the blood stocks are running low.
* As a *hospital or health institution staff*, I want to be able to create a blood request when blood stocks are running 
low or my patients requires direct blood transfusion.
* As a *research institution staff*, I want to be able to create a blood request when I need donors for research
purposes (e.g. recovered COVID-19 donors for vaccine research, etc).
* As an *blood donation event organiser*, I want to be able to create a blood request inform of my event and increase
participation.

## Scope of project
The platform utilises mobile (for Android and iOS) and web applications as the **front-end** interfaces for blood donors
to view and respond to blood requests and blood seekers to create blood requests. The 
[mobile app](http://github.com/bloodwork-nus/bloodconnect) is being developed with [React Native](http://reactnative.dev)
and the web app will be developed with [React](http://reactjs.org).

A set of **back-end** APIs will be developed for authentication, database, push notifications, and pairing algorithms. 
This will be developed with [Node.js](http://nodejs.org) and [Firebase](http://firebase.google.com) cloud functions.

---

In addition of the algorithm to pair donors and donees, these are the several features to be completed by **mid June**.

### Mobile application
This app is the main BloodConnect app which enables users to create, view, and respond to blood requests. Registered
users will be able to view their donations/requests history and be notified of nearby blood donations. Users can also
share blood requests to their friends.

### Maps
BloodConnect will make use of the Google Maps API (for Android) and Apple Maps (for iOS). The blood requests will appear
on the map and users will be able to tap on the markers to see the details for each requests.

### Authentication
Using Firebase, BloodConnect allows for user accounts creation. In addition, OAuth will also be implemented to allow
users to create account with existing services, e.g. Google or Facebook accounts.

### Smart search
The search function in BloodConnect will be developed to allow searches based on blood type, types of venues, emergency,
time, descriptions, and venue names. In addition, voice search will also be implemented.

### Push notifications
Nearby donors (registered users) will be notified when a blood request is made requiring their blood type. Users can
opt to be notified of all blood requests, only emergency ones, those coming from specific venues (hospitals or blood banks),
etc.

---

These are the several features to be completed by **mid July**.

### Web application
To increase accessibility, a web app version of BloodConnect, accessible from mobile and desktop browsers, will also be
developed.

### OTP verification
OTP verification for users' mobile phone or email verifications.

### Custom protocol handler
Since users can share blood requests, we plan to share the blood requests in a form of a link which will be able to 
redirect users to the web or mobile app. To redirect to the latter, a custom protocol handler is needed.

### Expression of gratitude
After a successful blood donation, an animation will be displayed to thank donors for their heroic and selfless 
contribution.

### Open API
We plan to develop an open API for developers alike to build upon our platform. Although we believe that these APIs will
be useful, as of now, it is still a tentative milestone.

## Other platforms
We did a literature review and there have been similar platforms developed,
such as [Simply Blood](http://simplyblood.com), [Donor2Donor](http://donor2donor.com/), [Blood4Life.ID](http://blood4life.id/), and [Red Cross Connection](https://www.techinasia.com/singapore-red-cross-gamifies-blood-donations-app).

* [Simply Blood](http://simplyblood.com), developed in 2017  
Simply Blood is an Android and web app developed as a platform to connect blood donors
with blood seekers to alleviate blood shortage, wastage, and transfusion waiting time. After inspecting the app,
we saw that it requires *all* users (donors and seekers) to create
an account with their mobile phone number, which is verified by an SMS OTP. The app also requires blood requesters
to provide their full name, which may be considered a privacy concern, as some users may not want to disclose the 
fact that they have medical conditions which require blood transfusion. **With BloodConnect**, we will design a more intuitive UI which not only looks modern and recent, but also easy to use. BloodConnect will only require *blood seekers*
to register and verify their email address to prevent illegal activities, but allow *blood donors* to use the app
without registration. However, blood donors can create an account to view their donation history, save their
fitness survey for a set period of time (TBC), and be notified of any nearby blood requests. BloodConnect **will not** require users' full name for privacy reasons.

* [Donor2Donor](http://donor2donor.com/), developed in 2016  
This app takes a different approach towards finding blood donations. First of all, this app also allows for organ
donations, not only blood donations. Secondly, this app allows blood seekers to find available blood donors with
maximum radius of 50 km. This approach is different from BloodConnect's, as donors will have to publish their 
availability in the platform and blood seekers will choose from a list of available donors. Donor2Donor, despite having
their website written in English, seems to focus on the Indian community, as their ads are mainly in Hindi. We aim
to enable connections in any parts of the world.

* [Blood4Life.ID](http://blood4life.id/), developed in 2009  
In 2009, Blood4Life.ID used mailing lists, and shifted to Twitter and Facebook in 2010. In 2019, they developed the
[web application](http://blood4life.id) as a more systematic platform. It appears that Blood4Life.ID takes a more
social approach, as their web app contains a lot of posts, events, news, community collaterals, and blood requests
map in between. Also, this platform is only available for the Indonesian community. Its blood donation search
function only "posts" request and donors will have to search and contact the requester directly. **With BloodConnect**,
it will notify nearby users and there is a call-to-action for donors to connect with the requester.

* [Red Cross Connection](https://www.techinasia.com/singapore-red-cross-gamifies-blood-donations-app), developed in 2014  
This platform was developed by the Singapore Red Cross as a campaign, and was officially announced in January 2014.[^4] 
It shared similarities with BloodConnect, however, it is no longer operational. The app allows users to post the 
"number of lives they have saved" and view the "number of blood donations made by their peers".[^5] We believe that 
this feature does not value-add into the problem that the platform was aiming to tackle: 
*amplifying the search for donors*.[^4] Instead, this feature may make blood donation seemed competitive and users can 
showcase the "*number of lives they have saved*". As a reward, blood donors may scan a QR code at donation sites to view an
AR animation an an appreciation for their "selfless and heroic acts".[^6] While we agree with the campaign's message that 
donating blood is a heroic act, the aim of BloodConnect's development is not as a campaign, but as a tool to solve the 
problem with finding blood. That being said, as of now, we do not plan to take a gamified approach towards blood donation.

[^4]: https://www.campaignasia.com/agencyportfolio/casestudy/200,red-cross-connection.aspx#.XtIaHjoza00
[^5]: https://www.todayonline.com/singapore/singapore-red-cross-launches-mobile-app-blood-donation
[^6]: https://www.techinasia.com/singapore-red-cross-gamifies-blood-donations-app

## Program flow
![Program and user flow diagram](https://github.com/bloodwork-nus/bloodconnect-docs/raw/master/static/img/program-flow.svg)

## Progress video
If you cannot view the video in the frame below, click [here](https://youtu.be/xASdTHSVbhs) to watch it on YouTube.
<iframe width="560" height="315" src="https://www.youtube.com/embed/xASdTHSVbhs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Project poster
[Click here to view the poster.](https://github.com/bloodwork-nus/bloodconnect-docs/raw/master/static/misc/bloodconnect-poster-20200601.pdf)

## Project Log

| No | Task | Date | Phillmont (hours) | Ivan (hours) | Remarks |
| -- | ---- | ---- | ----------------- | ------------ | ------- |
| 1  | Project preparation | See remarks | 20 | 6 | **Phillmont** learnt the fundamentals of React Native, Redux, Firebase, Cloud Functions, continuous integrations, Node.js, and serverless RESTful APIs (May 11-18). <br/> **Ivan** learnt the fundamentals of JavaScript and React (May 18-22). |
| 2  | Preparing poster, video, and proposal for mentor matching | May 13 | 6 | | [Click here for poster](http://bit.ly/BloodConnectPoster). <br /> [Click here for video](http://bit.ly/BloodConnectVideo). <br /> [Click here for proposal](http://bit.ly/BloodConnectProposal). |
| 3  | Team Meeting 1: Briefing | May 18 | 4 | 4 | Ideation and discussion to solidify project proposal before meeting mentors. Also delegated roles for the project. |
| 4  | Meeting with Robin Loh | May 19 | 3 | 3 | Mentor matching. Discussed about the fundamentals of software development, documentation, testing, and project proposal. |
| 5  | Meeting with Leslie Ho | May 20 | 1 | 1 | Mentor matching. Discussed about project proposal and features. Also planned for expectations by Milestones 1 to 3. |
| 6  | Team Meeting 2: Thoughts | May 20 | 1 | 1 | Discussed about thoughts after meeting and exchanging emails with several mentors. We chose to continue with Leslie Ho. |
| 7  | Wireframing | May 23 | 7 | 2 | [Click here for the wireframes designed so far](https://github.com/bloodwork-nus/bloodconnect-docs/raw/master/static/misc/bloodconnect-mockup.pdf). |
| 8  | Continuous integration | May 25 | 3 | | Integrated CircleCI and Jest to the [front-end app](https://github.com/bloodwork-nus/bloodconnect/pull/1) with temporary sample tests. |
| 9  | Team Meeting 3: Milestone | May 26 | 1 | 1 | Discussed about Milestone 1 submission and development roles. | 
| 10 | Development: Intro screen | May 26 | 7 | | Designed the assets (in SVG) and developed the intro page (see wireframe PDF page 1-3). |
| 11 | Development: Login screen | May 27 | 10 | | Developed the login screen and relevant components (e.g. buttons, text boxes, etc.). |
| 12 | Development: Create account screen | May 28 | 5 | | Developed the create account screen and fixed platform-specific problems with the components (e.g. [keyboard pushing up view on Android](https://github.com/bloodwork-nus/bloodconnect/commit/34e9119f41e5bf262a47fa705410530097ebbd87), [shadows not appearing on iOS](https://github.com/bloodwork-nus/bloodconnect/commit/4d621abf069935db77b11a3fe4ca164aaa9a7c95), etc). |
| 13 | Development: Explore screen (Part 1) | May 28 | 7 | | Developed the bottom bar with inlet floating action button and integration a scrollable animated bottom sheet. |
| 14 | Development: Explore screen (Part 2) | May 29 | 10 | | Integrated Google Maps (on Android) and Apple Maps (on iOS), added my-location and user profile buttons, requests list view, and debugged weird bottom sheet layout and shadow issues. |
| 15 | Mission Control 3 | May 30 | 2 | 2 | UI/UX Workshop Part 1. Ivan also watched the recording of the session. The recording was only made for our team only, will *never* be shared with anyone. |
| 16 | Team Meeting 4: Features | May 30 | 3 | 3 | Discussed about project scope, specific features, and BloodConnect's unique selling points. Also compared UI designs from other apps (e.g. Netflix, Gojek, Uber, etc.) with BloodConnect. |
| 17 | Deployed [BloodConnect Docs](https://github.com/bloodwork-nus/bloodconnect-docs) (this site!) | May 31 | 2 | 2 | Developed this site as a developers' documentation and project stories. |
| | **Total hours** | | 92 | 25 | |

Total hours spent by both Orbitees: 92 + 25 = **117 hours**.

See you in Milestone 2 👋!