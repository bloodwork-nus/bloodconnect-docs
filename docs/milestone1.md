---
id: milestone1
title: "Milestone 1 🚀"
sidebar_label: Milestone 1
---

Proposed level of achievement: **Artemis**.

## Motivation


## Aim of project

## User stories

## Scope of project

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
This platform was developed by the Singapore Red Cross as a campaign, and was officially announced in January 2014.[^1] 
It shared similarities with BloodConnect, however, it is no longer operational. The app allows users to post the 
"number of lives they have saved" and view the "number of blood donations made by their peers".[^2] We believe that 
this feature does not value-add into the problem that the platform was aiming to tackle: 
*amplifying the search for donors*.[^1] Instead, this feature may make blood donation seemed competitive and users can 
showcase the "*number of lives they have saved*". As a reward, blood donors may scan a QR code at donation sites to view an
AR animation an an appreciation for their "selfless and heroic acts".[^3] While we agree with the campaign's message that 
donating blood is a heroic act, the aim of BloodConnect's development is not as a campaign, but as a tool to solve the 
problem with finding blood. That being said, as of now, we do not plan to take a gamified approach towards blood donation.

[^1]: https://www.campaignasia.com/agencyportfolio/casestudy/200,red-cross-connection.aspx#.XtIaHjoza00
[^2]: https://www.todayonline.com/singapore/singapore-red-cross-launches-mobile-app-blood-donation
[^3]: https://www.techinasia.com/singapore-red-cross-gamifies-blood-donations-app

## User flow

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