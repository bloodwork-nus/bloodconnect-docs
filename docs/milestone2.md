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
which allows arbitrary shell commands execution. BloodConnect is susceptible to this vulnerability. Fret not, we have tested an experimental branch
with updated packages that will resolve this vulnerability. It will be deployed by Milestone 3 after upgrading our code base.
:::

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