![DevConnect Banner](https://imgur.com/zfsEzZ4.png)

# DevConnect

## The Project

This project is based on a web-course on Udemy, specifically [MERN Stack Front to Back](https://www.udemy.com/mern-stack-front-to-back/). However, this project is not a one for one copy. I've implemented some of my own coding styles, features and styling for the site. The source code for the project in the course mentioned earlier is available [here](https://github.com/bradtraversy/devconnector).

> This site is a social network app built using the MERN stack that allows developers to create accounts, make public text posts, and create customized profiles including links to their other social media, websites, and information about themselves.

## My Features

- [x] Favicon and Logo art
- [x] Better sanitization: Login and register email is not case-sensitive & profile handle is always lowercase
- [x] Likes and dislikes do not require refreshing the post list
- [ ] Connect social media accounts: Integrate social media sites API for validating ownership of social media
- [ ] Use a custom Foundation UI for the website instead of the premade bootstrap one
- [ ] Reset / change password

Features will be developed after completing the base project.

## Live Host

https://dconnect.herokuapp.com

# Run Development

#### First run `npm i` in both the root directory and the client directory to download node modules.

## MongoDB

Go to https://www.mongodb.com/cloud/atlas and create a free account if you haven't already. Create a cluster and click 'Connect'. From there choose the Connect Your Application and create an admin account (remember this password!). Place the Short SRV URI with `<PASSWORD>` replaced with the password you just made in the keys file detailed below.

## JWT SecretOrKey

This can be any random string.

### keys.js

```javascript
// root/config/keys_dev.js
module.exports = {
  mongoURI: 'YourMongoURI',
  secret: 'YourJWTTokenSecretOrKey'
};
```

## GitHub OAuth

Log into GitHub and go to https://github.com/settings/developers. Here you need to create an OAuth application and fill in the info with whatever you want. Once complete use the client id and secret as directed below.

### client/src/config/keys_dev.js

```javascript
// root/client/config/keys_dev
export default ({
  githubSecret: 'YourGitHubSecret'
});
```

and change client id to yours

### client/components/profile/Profile.js

```javascript
// root/client/components/profile/Profile.js
state = {
  clientId: 'YourClientId',
  clientSecret: keys.githubSecret,
  count: 5,
  sort: 'created: asc',
  repos: []
};
```

#### Setup complete! Now just run `npm run dev`
