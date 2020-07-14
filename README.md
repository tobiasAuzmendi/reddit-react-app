# React app of Reddit posts

<img src="src/assets/images/header/header-image.png" height="100"/>

**Version 1.0.0**

A React application developed with React hooks and Redux state. With this app, the user can search different reddit posts and save these posts in their own library of read posts, as well as save post pictures in a picture gallery. Due to the application architecture it wouldn't be a difficult task to modify the search api and use this presentation of information for other types of content, even several apis could be integrated simultaneously in the same app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The technologies used were mainly React, Redux and Sass, and for all I have tried to use best practices.

The reason for creating this project was to resolve a front end development challenge for a job position. Hopefully, with the corresponding consent, this project is going to be part of a personal portfolio of Javascript projects in the future, since I have worked with many front end technologies and I would like to improve the way I show it.

## Live app

You can enter to [tobiasauzmendi.dev](https://tobiasauzmendi.dev) in order to see the app running. In this case I used an EC2 Instance of AWS to deploy it.

## App startup

In order to run the project you can run the following commands on the project root directory:

```
npm install
npm start
```

The last command will run the app in [http://localhost:3000](http://localhost:3000).

## Testing

From the project root directory you can run the following commands to run the project tests:

```
npm test
```

## Deployment

To deploy the app you should run `npm run build`. It will create a build folder in the root directory. This folder contains a compact and optimized version of the app. You should replace this folder in your server.