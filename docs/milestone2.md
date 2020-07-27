---
id: milestone2
title: "Milestone 2 🛠️"
sidebar_label: Milestone 2
---

Proposed level of achievement: **Artemis**.

## What's new?
Milestone 2 brought about many fundamental features and enables the core functionality of BloodConnect, i.e. to connect donors and donees. There
are hundreds of bugfixes and performance improvements too, but here are some of the big features in Milestone 2.

### Authorisation 🔑
Users can now create an account with their full name and email address. Afterwards, they can log in to browse, create, and respond to requests.
Upon creation of new accounts, verification emails will be sent and users will be required to verify their email address before making a request.
Currently, there are partial Guest account and Sign in with Google capabilities, but this feature can simply be integrated in Milestone 3.

### Maps 🗺️
The map view powered by Google Maps and Apple Maps for Android and iOS has been fully integrated. In the Explore screen, requests all over the world
will be marked with a red pin 📍. Users can navigate to their current location (with a sleek animation 😎) and tapping on the red pins will open up
a card with the request details containing location name and address, blood type, and a brief description if specified, as well as a Donate button.

Similar map view has also been integrated in the create-a-new-request screen. When creating a new request, users can search 🔍 for a location name 
and address via a search box powered by the [Google Maps Places API](https://developers.google.com/places/web-service/intro). The choice for this 
API is due to the vast database of places served by the Google Maps Platform. Currently, the map view is static and serves as a second confirmation
if the place selected from the search box is accurate. We aim to allow users to pinpoint location by dragging the map view, as seen in Gojek, Uber,
and Grab apps. This will require the [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start). However, this
API (and others too we believe) cannot retrieve a location's name&mdash;just their address. We may or may not bring this feature in Milestone 3.

### Requests and donations 🩸
Database 🗄️ is the main gist of BloodConnect. Users can now create a request, and the request will be updated in real-time ⏱️ in every BloodConnect
instances. Users can also manage the list of requests, cancel, and delete them through the Manage requests page. Potential donors can respond to
requests by tapping 👆 Donate and providing their blood type, contact name and number, and the potential donors will be updated real-time in the
Manage requests page. The requester can sort through the list of potential donors and contact them. After making an appointment and completing
the transfusion, the requester can mark a request as completed ✅ with a donor.

### Push notifications 🔔
For every new potential donor, a notification will be pushed to the requester to notify them. This push notification is powered by 
[Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) on Android and 
[Apple Push Notification service](https://developer.apple.com/notifications/) on iOS. The database listeners are implemented via the serverless 
[Cloud Functions for Firebase](https://firebase.google.com/docs/functions). The push notification is working, however, cannot be demonstrated
as the Spark (free) subscription of Firebase does not permit external HTTP requests. Otherwise, the author has confirmed that the notifications
will be pushed.

We aim to push notifications when a request has been made to nearby users, which is one of BloodConnect's main features. However, we foresee not
only an issue with our free Firebase subscription, but also privacy issues 🔒 regarding the scanning and obtaining of locations of users from our
database. We will continue to assess the mechanisms and hope to bring this feature in Milestone 3.

### General improvements 📈
By manipulating the animation frame in React Native, BloodConnect's UI components are now more responsive 🏃‍♂️💨. Components have been restructured
and simplified, without sacrificing their aesthetics, which reduces total render time. With the recent release of Expo SDK 38, we will further
restructure BloodConnect's homebrew UI components and refactor asynchronous function calls to not only improve overall performance, but also reduce
the final distributable app packages' size 📦.

:::important
We are well aware of the recent [CVE-2020-8149](https://nvd.nist.gov/vuln/detail/CVE-2020-8149) vulnerability involving `logkitty` version < 0.7.1
which allows arbitrary shell commands execution. We have patched this vulnerability in BloodConnect in our local branch, which contains our 
upgraded code base.
:::

## User's guide
Woohoo 🎉! We finally have a user's guide. [Click here to view the latest User's Guide](userguide).

## Testing
As Milestone 2 is a prototyping phase, unit tests have not yet been integrated in our code base (please ignore the Failed CircleCI status image).
However, we have performed manual system tests with regards to the several features we have implemented.

### Authorisation
- **Creating an account**. We created a user account with a full name, email address, and password. As expected, the user was logged in and
a verification email was sent. There was an issue whereby the authentication state was mutated and caused mix-ups and verification emails be sent
to other users, and replaces the previous users' details.
[This issue has been fixed](https://github.com/bloodwork-nus/bloodconnect/commit/1358d7b6b21740986a3a78524ff9e9c24638abfc).

- **Logging in**. We logged in with correct credentials, and the login was successful and the user's requests and details were correctly retrieved.
Logging in with wrong credentials will lead to an error message, as expected.

- **Logging out**. Upon logging out, we tried accessing screens which requires an authorised state, and the request failed, as expected. However,
it was known that when logging in with a user (e.g. Alice), logging out, and logging in with another user (e.g. Bob), some screens were not 
re-rendered, leading to the old user's (Alice's) data being displayed. This issue can simply be resolved by ensuring proper purging after a logout
and re-rendering screens after a successful login. We will create a service to perform these tasks, and deliver it in Milestone 3.

- **Creating an account with used email address** led to an error. Passwords must also be at least 6 characters, as expected.

### Maps
- **Navigating with multitouch**. Pan and zooming gestures worked as expected on map views. Rotating the map view did not misalign the markers,
callouts, and user's location.

- **Tapping on request markers** will lower down the bottom sheet and display a card containing the request's details. Tapping anywhere outside
on the map view will dismiss the card. The bottom sheet should be on top of the request details card and thus, when swiped up, cover the card. 
However, since the card uses elevation on Android for shadows, for some reasons it was brought to the front unexpectedly. 
[This issue has been fixed](https://github.com/bloodwork-nus/bloodconnect/commit/4f6b05f09d9f0ecc47449a432fdaa21562baa8fd).

- **Panning on map view** will lower the bottom sheet for better viewing experience, and it worked as expected.

### Requests and donations
- **Creating a new request from start to finish**. A request was made from start to finish and there were no hiccups. The database was updated
almost instantly and on other devices, the request appeared instantly too, thanks to the integrated realtime database.

- **Submitting a donation availability from start to finish**. A donation was made from start to finish and everything performed as expected.
The database was updated almost instantly, and the requester received a push notification about the new potential donor.

:::note
We will create a validator to ensure that only donors with compatible blood types can respond to a request. This should be more useful towards
the requester. At this stage, we are still designing an optimal approach to this feature, since one user account can respond to a request with 
actual donor being a different person (i.e. a friend or family member of the account owner).
:::

### New request screen
- **Tapping on the + button** opens the new request screen. However, there was a delay in opening the page, which is believed due to the structuring
of the three steps' pages loading at once. We will continue to refactor the component to reduce the delay.

- **Choose a blood type modal**. Tapping on the Choose button opens the bottom sheet modal with a list of blood types. Upon selecting a blood type,
the modal will be dismissed and the button's label will be changed to the blood type and the text will be bolded. Interacting on the grey area 
outside the modal, instead of allowing touches to pass through the form, dismisses the modal, as expected. However, since the displayed value
was also the `id` of the blood type sent to the database, when parsed back to the requests page, some blood type will overflow the text field
(e.g. `Others (specify in description)` or `Any blood groups` will appear as is on the square text field designed for blood types such as `AB+` or
`A-`). This can simply be fixed by abstracting these values to enumerated constants and translating them every time they are translated to the UI.

- **Specifying the number of units** with the numeric up-down works, but allows negative values and zero unit. This can simply be fixed by 
locking the value.

- **Contact number fields**, although enables the phone pad keyboard, allows non-numeric characters to be typed. A user could be using an external
keyboard and typed non-numeric characters into it. This can be fixed by adding a validator in each key press.

- **Description is capped to 95 characters**. The characters counter worked as expected, and upon typing the 96th character, the text will be 
blocked. However, it is possible for users to insert line breaks, i.e. `\n`. This issue was fixed 
[here](https://github.com/bloodwork-nus/bloodconnect/commit/c283fba6a076f6b4affd2ceab9bbd2c8d5bb5692) and 
[here](https://github.com/bloodwork-nus/bloodconnect/commit/5109cc7d010f26746e99fc0fa34ebbd3805a5889) by trimming the description
after confirmation. However, it is still possible for the user to put line breaks and end the description with a character, thus leading to an
overly large request details card in the Explore screen. This issue can be fixed by completely disabling the input of line breaks. We tried
copying a long text and pasting it to the text field, and it was truncated to 95 characters, as expected.

- **Required fields**, such as request type, blood type, contact name, and contact number must be filled before user is allowed to progress to 
the next step. Users must also choose a location before allowed to access the last step of making a new request.

- **Blood type was uppercased in review request screen** due to the use of same fields for `id` and `label`, similar to blood types as 
mentioned previously.

- **Edit buttons** tapped brings the user back to the screen containing controls to edit the respective variables, as expected. By exploiting 
[React Refs](https://reactjs.org/docs/refs-and-the-dom.html), we could probably control the components such that they can be automatically focused
when users want to edit several variables (e.g. focusing the contact name text box if user wants to edit contact details) or highlighting 
(in red) the required fields that the user forgot to fill.

### Manage requests screen
- **Request controls**. For all requests, users will be able to view the request location name and address, blood type, emergency badge if 
applicable, and time of creation. The controls were displayed correctly.

- **Open request controls**. For open requests, users will be able to see number of potential donors, a View donors and Close request buttons.
Tapping on Close request will close the request and move the request down to Past requests.

- **Complete, cancel, and delete request buttons**. The actions performed worked exactly as intended, with complete and cancel buttons correctly
updating the `status` fields in our database, and completing a request additionally adds `dateCompleted` and `donor` fields to the request object.
Delete request completely purges the request object off our database.

- **Past request controls**. For completed requests, users will be able to see the final donor's name and contact number and the time of completion
for reference. For both completed and cancelled requests, tapping on Delete request will remove the request from our database. Indeed, the request
object was deleted when tapped. However, we discovered that the donation object was not deleted, since they were on a different tree. Nevertheless,
we plan on abstracting the database mutators to the cloud functions, so this issue will be fixed.

### UI components
- **Map overlay UI components should stay behind bottom sheet and bottom bar**. User profile button, my location button, and request details 
cards stayed behind when the bottom sheet was slide up. There was once when the user profile and location buttons suddenly float on top. 
[This issue has been fixed](https://github.com/bloodwork-nus/bloodconnect/commit/e7b3016e5d9dca011836eda723659e41d920c08e).

- **Tapping on a button multiple times**. We improved our UI components' responsiveness by altering the animation frame. However, this leads to 
buttons becoming active again before tasks were completed (some tasks are asynchronous). Therefore, if a user taps on a Submit button repeatedly,
the same request will be made multiple times to our database. This can be fixed by transferring user to a loading screen or disabling the button
until the process is completed.

- **Tapping on bottom sheet `Touchable`s should invoke the event listener**. Yeah, you think it's trivial?
[I don't think so](https://github.com/bloodwork-nus/bloodconnect/commit/f35e12002b37b66ed10b635018548662ce4d9678). Oh, and
[another one](https://github.com/bloodwork-nus/bloodconnect/commit/06d8b8baf94030b1a54f3c4c34b167e713d1b1a9). Since the bottom sheet is powered
by `react-native-gesture-handler`, the `Touchable`s used must also be imported from `react-native-gesture-handler` since the gesture and tap
controllers will overlap otherwise.

- **Bottom sheet**. Tapping on the right list icon on the bottom bar in the Explore screen expands the bottom sheet to show the list of requests.
If the user decides to just slide the bottom sheet up, then the focused button in the bottom bar will be shifted to Requests, as expected. When
the user slides the bottom sheet down, the focused button will be shifted to Explore. This behaviour, however, only worked once, and the Request
button did not get focused if the bottom sheet was slide up the second time. It is possible that this behaviour was due to the behaviour of the
bottom sheet, which uses [`react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/docs/getting-started.html) and
[`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/). For some reasons, the callback provided by the API did not
respond, or the component did not re-render. Nevertheless, this problem is not fixable (since it was from the API), and we will change the
Requests button to transfer user to the Manage requests screen, which is more useful.

- **Requests show only open requests**. We also noticed that the list of requests shown in the bottom sheet includes closed requests. This can
simply be fixed by adding a validator. Nevertheless, this issue will be fixed once we abstract the database queries to our cloud functions.

- **Cancelling a new request screeen and navigating to other screens** should not be an issue. We noticed that after cancelling from new request
screen and entering user profile screen, the back button would not transfer the user back and React complained with a warning that the screen
was unmounted. This was probably due to the [`BackHandler`](https://reactnative.dev/docs/backhandler) attached to 
[`NewRequestFormScreen`](https://github.com/bloodwork-nus/bloodconnect/commit/6b65bdae4ad130a2535faa50dbad6a91d0f168d9), which
was *not* detached when Cancel was tapped, since it triggered [`navigation.goBack()`](https://reactnavigation.org/docs/navigation-prop/) which did 
not unmount the screen. No worries, we can fix this issue by using a different mechanism to go back to previous steps and cancel a new request
creation, or using React's [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) and 
[`useEffect`](https://reactjs.org/docs/hooks-effect.html) to ensure the `BackHandler` is detached.

- **Interacting with UI components when keyboard is open**. This has always been a known issue with React Native. When the keyboard is open,
tapping on any `Touchable`s will dismiss the keyboard, but the event listener was not invoked. Therefore, users will have to double tap a Login 
button when the keyboard is open after typing their credentials. This issue is fixable by setting the 
[`keyboardShouldPersistTaps`](https://reactnative.dev/docs/scrollview#keyboardshouldpersisttaps) prop to `"always"`. However, this prop is only
usable in `ScrollView`s and `VirtualizedList`s. We will continue to investigate this problem.

- **Padding objects when keyboard is open**. When the keyboard is open, it may obstruct some components, even focused ones, such that the user
cannot view what they are typing. In Android, this has been a [known issue with Expo](https://github.com/expo/expo/issues/1247) involving the
unconfigurable `windowSoftInputMode`. We have worked on a fix for this issue multiple times with 
[ScrollView and KeyboardAvoidingView](https://github.com/bloodwork-nus/bloodconnect/commit/34e9119f41e5bf262a47fa705410530097ebbd87#diff-5b71b62c5b31e4ee656234c53e295ae3),
[using `minHeight`](https://github.com/bloodwork-nus/bloodconnect/commit/3f590890e87ccdc9c25f10ece1fd58dab288bc29),
[here](https://github.com/bloodwork-nus/bloodconnect/commit/c9caf7e123a6572b2165c328b48b3a02e019dcec#diff-2ac791c2ef19a29965750941c6d21355R106),
and [here](https://github.com/bloodwork-nus/bloodconnect/commit/550b1c4506f8f6a1fd226b157719bc6ea8db687a) with `KeyboardAvoidingView`s. In iOS,
the `KeyboardAvoidingView`'s behaviour is different, and the view only pads the screen when a component (e.g. text box) is tapped. We will have
to continue experimenting with manual padding behaviours to ensure fields are viewable when a user is changing its value.

:::note
As of [Expo SDK 38 released 4 days ago](https://blog.expo.io/expo-sdk-38-is-now-available-ab6cd30ca2ee), `windowSoftInputMode` is finally
configurable, and this issue should be fixed on Android once we upgrade our code base to SDK 38. We will have to continue experimenting with iOS.
:::

### Known issues
These are issues that are unfixable by the author and are manifestations of bugs in the frameworks used in this project. Trust me, I am so done
and fed up with these frameworks but I cannot run from it :)

- **Random Drawable error popping up**. This issue was raised on June 29, 2020 and is suspected to be caused by a bug with `TextInput` components
in React Native. [This issue has been opened since January 11, 2018](https://github.com/facebook/react-native/issues/17530). This is the error
log thrown.  
>Attempt to invoke virtual method `'android.graphics.drawable.Drawable
android.graphics.drawable.Drawable$ConstantState.newDrawable(android.content.res.Resources)'`
on a `null` object reference

- **Firebase Realtime Database large `setTimeout` and `AlarmManager`**. Firebase APIs for JavaScript, especially the Realtime Database listeners,
will always run live in the foreground. However, React Native complains the following message every so often, when the listeners refresh their
timeout periods. [This has been a known issue with React Native](https://github.com/facebook/react-native/issues/12981) and can only be solved
from React Native's end. One alternative is to suppress the warning, but I despise it.  
>Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the
timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981
for more info. (Saw `setTimeout` with duration 224059ms).

## Note on compilables
While it is our desire to deliver compilables for users to try BloodConnect, we cannot release the compiled application packages (i.e. APKs for
Android and IPAs for iOS). This is due to the fact that we used many APIs, many of which are free with limits, or borrowed API keys. We cannot risk
API overuse on our end, so, if you would like to try BloodConnect, we kindly invite you to self-build it by following the instructions 
[here](https://github.com/bloodwork-nus/bloodconnect#building-and-developing).

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

These are the several features to be completed by **mid July**.

### Mobile application
This app is the main BloodConnect app which enables users to create, view, and respond to blood requests. Registered
users will be able to view their donations/requests history and be notified of nearby blood donations. Users can also
share blood requests to their friends.

### Smart search
The search function in BloodConnect will be developed to allow searches based on blood type, types of venues, emergency,
time, descriptions, and venue names. In addition, voice search will also be implemented.

### OTP verification
OTP verification for users' mobile phone or email verifications.

### Custom protocol handler
Since users can share blood requests, we plan to share the blood requests in a form of a link which will be able to 
redirect users to the web or mobile app. To redirect to the latter, a custom protocol handler is needed.

### Expression of gratitude
After a successful blood donation, an animation will be displayed to thank donors for their heroic and selfless 
contribution.

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
If you cannot view the video in the frame below, click [here](https://youtu.be/jnywpl0A-LQ) to watch it on YouTube.
<iframe width="560" height="315" src="https://www.youtube.com/embed/jnywpl0A-LQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Project poster
[Click here to view the poster.](https://github.com/bloodwork-nus/bloodconnect-docs/raw/master/static/misc/bloodconnect-poster-20200601.pdf)

## Project log
| No | Task | Date | Phillmont (hours) | Ivan (hours) | Remarks |
| -- | ---- | ---- | ----------------- | ------------ | ------- |
| 1 | Milestone 1 peer review | Jun 8 | | 8 | |
| 2 | Meetings with Gerald and Leslie on Milestone 1 | Jun 5, 10 | 2 | 2 | Discussed about what to expect for Milestone 2, how to design better forms, and some UI improvements suggestions. |
| 3 | Mastering Redux and state management | Jun 11-12 | 20 | | Redux will be used in BloodConnect to manage states and store user preferences globally. |
| 4 | Wireframing | Jun 13-14 | 20 | | Designed additional 7 screens |
| 5 | Developing New Request Screen | Jun 15 | 10 | | Three steps, including the fields, select location, and review screens. |
| 6 | Developing Maps markers and `LocationCard` | Jun 16 | 10 | | Placing markers, designing callouts, and various tap handlers to interact with the bottom sheet. |
| 7 | Developing DonateScreen | Jun 17 | 10 | | |
| 8 | Developing UserProfileScreen | Jun 18 | 10 | | | 
| 9 | Developing Manage requests screen | Jun 19 | 10 | | Including the view donors screen. |
| 10 | Integrating Firebase Realtime Database and Authentication | Jun 20-22 | 30 | | Fetching user details, realtime requests and donations refresh, database queries, etc. |
| 11 | Enabling Manage requests features in Database | Jun 23-24 | 20 | | Requests can have different statuses, and different statuses have different behaviours in the Manage requests screen. This task includes the testing of Manage requests screen. |
| 12 | Bugfixing and UI components refactorings | Misc | 15 | | As listed in the Testing section above. |
| | **Total hours** | | 157 | 10 | |

Total hours spent by both Orbitees: 157 + 10 = **167 hours**.

See you in Milestone 3 👋!