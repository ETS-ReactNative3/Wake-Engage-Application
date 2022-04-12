<h1 align="center">
    <br>
    <a  rel="noopener noreferrer"><img width="200" src="https://github.com/bernadetteveni/Wake-Engage-Application/blob/828c5d18599193b189bd55ea4641dc7778b23a38/assets/Logo.png?raw=true" alt="Wake Engage logo"></a>
    <br>
    Wake Engage
    <br>
</h1>
<h4 align="center">Wake Engage is a mobile alarm clock application that incorporates mind-stimulating games to provide an efficient and dependable way to start your day.<h4>
<p align="center"><img src="https://img.shields.io/badge/version -v1.0.0-blue" alt="version" style="max-width: 100%;"> <img src="https://img.shields.io/npm/l/vue.svg?sanitize=true" alt="License"> <img src="https://img.shields.io/badge/coverage-0%25-red" alt="coverage" style="max-width: 100%;"> <img src="https://img.shields.io/badge/npm-v8.4.1-blue" alt="npm" style="max-width: 100%;"> <img src="https://img.shields.io/badge/yarn-v1.22.17-blue" alt="yarn" style="max-width: 100%;"> <img src="https://img.shields.io/badge/expo-v5.3.0-blue" alt="expo" style="max-width: 100%;"> <img src="https://img.shields.io/badge/framework-react%20native-orange" alt="expo" style="max-width: 100%;"></a>

## Project Description

Wake Engage is a mobile application that provides alarm clock functionality merged with three mind-stimulating games: Sum-Up, 8-Puzzle, and The Simon Game. The app is available for Android and IOS and provides users with the ability to set their alarm settings as with a typical alarm clock. However, that is where convention ends. Once the alarm clock rings the user can only turn off the alarm by first engaging in one of the simple and fun games. This alarm clock is sure to assist those who routinely turn their alarm clock off and go back to sleep - sometimes numerous times.

<div align="center">
<img src=".../../assets/giphy.gif" width="200" height="400" /> <img src="https://media.giphy.com/media/JjnBl4hhy206F5pFEv/giphy.gif" width="200" height="400" /> <img src="https://media.giphy.com/media/I3oMRh4Cb9fUc2ul7l/giphy.gif" width="200" height="400" /> <img src="https://media.giphy.com/media/ZcvyOmeuInAVdcRQNH/giphy.gif" width="200" height="400" />
</div>
    
## Table of contents

- [Installation Instructions](#installation-instructions)
- [Operating instructions](#operating-instructions)
- [Configuration Instructions](#configuration-instructions)
- [Usage](#usage)
- [Manifest](#manifest)
- [Troubleshooting Tips](#troubleshooting-tips)
- [Project Status](#project-status)
- [Road Map](#road-map)
- [Contact Details](#contact-details)
- [Contribute](#contribute)
- [Links to Further Readings](#links-to-further-readings)
- [License / Copyright](#license-/-copyright)
- [Credits and Acknowledgments](#credits-and-acknowledgments)

## Installation Instructions

1. <a href="https://docs.expo.dev/get-started/installation/">Follow EXPO Install page for your machine</a>
2. `git clone https://github.com/bernadetteveni/Wake-Engage-Application`
3. `cd /Wake-Engage-Application`
4. `yarn install`
5. `yarn start`

## Operating instructions

To start the application:
`"start": "expo start", or "yarn start"`
`"android": "expo start --android",`
`"ios": "expo start --ios",`
`"web": "expo start --web",`

To eject to application:
`"eject": "expo eject",`

Once the server is running you may open the <a href=https://expo.dev/>EXPO</a> application (available on the App Store and Google Play Store) to use Wake Engage on your IOS or Android mobile device.

## Configuration Instructions

app.json, babel.config.js, .prettierrc and .eslintrc.json have been provided as personal taste configuration options to format, edit and debug the application.

If you would like to modify which file is opened on app start up, you can edit the App.js file, located at ~/Wake-Engage-Application/App.js

By default, the application opens to the alarm page:
`const [pageId, setPageId] = useState('alarm')`

`const [game, setGame] = useState('0')`

To have the app open to one of the game pages:
`const [pageId, setPageId] = useState('games')`

`const [game, setGame] = useState('1')` for Sum-Up game Or,

`const [game, setGame] = useState('2')` for 8-Puzzle game Or,

`const [game, setGame] = useState('3')` for The Simon Game

## Usage

### Alarm System

This is the page the application will open to on app start up. The alarm page will provide the user with the ability to set and delete alarms. Any future date and time may be selected when setting an alarm. The user may enter a description for each alarm. The ability to select which game theuser would like to play when the alarm goes off (Sum-Up, 8-Puzzle or The Simon Game) is also provided. The alarm will go off at the selected time, and trigger a series of notifications to allow it to “ring” while the application is closed. The alarm will ring continuously until the application is opened via notification.

### Games

The user will be redirected to the the game selected during the alarm set-up through the triggered notifications. An alarm will play continuously until the user has won the game. There is the option to ‘Play Again’ if the user loses the game. When the user wins the game they may hit the “Shut off the alarm!” button.

## Manifest

```
- App.js --------> Loads page view based on 'pageId' and 'game' states (AlarmList.js page view by default). Handles push notifications for alarm functionality.
- Games.js ------> Loads game view (SumUp.js, Simon.js or 8Puzzle.js) based on ShowGame state retrieved from user during alarm set up.
- AlarmList.js --> Set alarm and delete alarm functionality. Retrieves and loads all current alarms to the view.
- Alarm.js ------> Converts time and date into readable strings with styling for better user experience.
- SumUp.js ------> Contains all Sum-Up game functionality.
- Simon.js ------> Contains all Simon game functionality.
- 8Puzzle.js ----> Contains all 8-Puzzle game functionality.
```

<img width="50%" alt="File structure tree" src="https://github.com/bernadetteveni/Wake-Engage-Application/blob/8ba5ff276180cdcd76c000c3089eeb1a6447e50b/assets/Manifest.png?raw=true" />

## Troubleshooting Tips

Run react-devtools for debugging / troubleshooting:
`yarn devtools` or `yarn run react-devtools`

## Project Status
Version 1.0 of the Wake Engage application has been completed. Version 2.0 (v2) of the application is in its planning stages, as outined below. 
## Road Map

Additional functionalities to be included in v2 of Wake Engage are:

- The addition of a Firebase database which will store the user's game score (time it took to win the game).
- The top 5 game scores of all users for that day will be queried from the database and posted for all users to view.
## Contact Details

| <img style="border-radius: 1000px; height:100px;" src=".../../assets/me.jpg"> | <a href="mailto:bernadette.v.123@gmail.com">Email me</a> <p>University of Regina</p> |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |

## Contribute
If you would like to contribute to the Wake Engage application, follow the steps outlined <a href="https://gist.github.com/MarcDiethelm/7303312">here</a>.
In summary:
```
- Create a personal fork of the project on Github.
- Clone the fork on your local machine. Your remote repo on Github is called origin.
- Push your branch to your fork on Github, the remote origin.
- From your fork open a pull request in the correct branch.  Target the project's master branch
```

## Links to Further Readings

- <a href="https://medium.com/geekculture/first-class-push-notifications-for-expo-apps-4bd7bbb9a01a">Making notifications work in production for iOS with Apple Developer Account (required)</a>

- <a href="https://docs.expo.dev/guides/routing-and-navigation/">Replace current hand made router with official EXPO Router</a>

## License / Copyright

[MIT](https://opensource.org/licenses/MIT) Copyright (c) 2022, @bernadetteveni

## Credits and Acknowledgments
- <a href="https://pngtree.com/freepng/cute-alarm-sains-gaming-illustration-isolated-in-purple-backgr_4773949.html">Logo</a>
- <a href="https://www.deviantart.com/catdragon4/art/Question-Mark-Background-741094355">App Background</a>
- <a href="https://shields.io/#your-badge">Shields</a>
- <a href="https://thenounproject.com/icon/trash-4665730/">Icon</a>
- Hvidsten, B. (2020, December 21). Adding timers to your expo managed react native app with backgroundfetch. Medium. Retrieved April 9, 2022, from https://align2source.medium.com/adding-timers-to-your-expo-managed-react-native-app-with-backgroundfetch-351dab97b96b 
- Notifications. Expo Documentation. (n.d.). Retrieved April 9, 2022, from https://docs.expo.dev/versions/latest/sdk/notifications/#notificationspresentlocalnotificationasynclocalnotification 
- React-Native-Datetimepicker. (n.d.). React-native-datetimepicker/Datetimepicker: React native date &amp; time picker component for IOS, Android and windows. GitHub. Retrieved April 9, 2022, from https://github.com/react-native-datetimepicker/datetimepicker 




