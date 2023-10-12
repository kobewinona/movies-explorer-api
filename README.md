[![cover](/images/movies-explorer-readme.jpg)](https://movies.dk.nomoredomainsrocks.ru)

# Movies-Explorer
[![React](https://img.shields.io/npm/v/react?style=flat-square)](https://www.npmjs.com/package/react)

[![Dima Klimkin Profile Page](https://img.shields.io/badge/Dima_Klimkin-f9f9f9?style=for-the-badge&logoColor=000&logo=github)](https://github.com/kobewinona)

[![HTML5](https://img.shields.io/badge/HTML5-f9f9f9?style=for-the-badge&logo=HTML5)](https://dev.w3.org/html5/spec-LC/)
[![CSS3](https://img.shields.io/badge/CSS3-f9f9f9?logoColor=264BDC&style=for-the-badge&logo=CSS3)](https://www.w3.org/TR/CSS/#css)
[![JavaScript](https://img.shields.io/badge/JavaScript-f9f9f9?style=for-the-badge&logo=JavaScript)](https://www.javascript.com)
[![React](https://img.shields.io/badge/React-f9f9f9?style=for-the-badge&logo=React)](https://react.dev)
[![CRA](https://img.shields.io/badge/CRA-f9f9f9?style=for-the-badge&logo=createreactapp)](https://create-react-app.dev)
[![Git](https://img.shields.io/badge/Git-f9f9f9?style=for-the-badge&logo=git)](https://git-scm.com) [![BEM](https://img.shields.io/badge/BEM-f9f9f9?logoColor=black&style=for-the-badge&logo=bem)](https://en.bem.info/methodology/)
[![Node.js](https://img.shields.io/badge/Node.js-f9f9f9?style=for-the-badge&logo=Node.js)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/Express.js-f9f9f9?style=for-the-badge&logoColor=000000&logo=Express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-f9f9f9?style=for-the-badge&logo=MongoDB)](https://www.mongodb.com)

[![Webstorm](https://img.shields.io/badge/Webstorm-f9f9f9?style=for-the-badge&logoColor=0066b8&logo=webstorm)](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiojunJrob_AhVBkmYCHUo9CkEYABAAGgJzbQ&ae=2&ohost=www.google.com&cid=CAESbeD2s_3F28tibUacQadmzB0nEItOP3IL0oRLAm8j0strsLviP55uS6YTuBUFZQG24kmk3q8Xv2nuYCUJ8LbmJZMmihBZSh3znKnfbQqjzSE39ZO6EuHtsdu2uToYj-Wqk3zF5I7Z8d7JAC9U89k&sig=AOD64_2Kp70jUNhk8FFzOAXsp6uOTrLJZQ&q&adurl&ved=2ahUKEwjKs-PJrob_AhVRSGwGHayEAzAQ0Qx6BAgJEAE&nis=2&dct=1)

## contents

- [available-scripts](#available-scripts)
- [registration and authorization](#registration-and-authorization)
- [about this project](#about-this-project)
- [what I learned doing this project](#what-I-learned-doing-this-project)
  - [cookies](#cookies)
  - [jest testing](#jest-testing)
  - [security and CORS](#security-and-cors)
  - [authentication and authorization](#authentication-and-authorization)

## available scripts

`npm run start` — starts the server in full work on mode

`npm run dev` — runs the server in development mode

`npm run lint` — runs ESLint code style tests

`npm run test` — runs a series of endpoint tests

## registration and authorization

Please feel free to register with any fake email and password, for example you can use oioi@oioi.com and a password like oioioi - it's fine.

## about this project

This is my final project within Web-Development Praktikum Course. It's built using`React` with authorization, registration, open API database search. This project utilizes `JWT`, `cookies`, `security and CORS` and `protected routes`.

The website is partially a portfolio page with all of my projects done during the course, but it also allows you to browse through a movies open database, add movies to your favourites and so on️.

## what I learned doing this project

### cookies

In this project I've extended my knowledge into how to store JWT in cookies for better security and how to set up its work between different domains.

### jest testing

For this project I wrote a series of tests for all the endpoints. It took me awhile, but I learned a lot about how important this tedious work is and I now know a little more about writing tests.

### security and CORS

Doing this project I also learnt a lot about methods to protect a website from `Cross Site Scripting (XSS)` and how to work with `Cross-origin resource sharing (CORS)` to set up a website work using a subdomain for an `api`. I also used `bcryptjs` library to create a `hash` from a password for better protection before storing in in a database. For better protection I used environment variable for storing a secret key needed to read a JWT.

### requests validation

For `api` requests validation, apart from validating the incoming data using `mongoose` library, I also used `celebrate` library to validate the incoming data for every `route`.

### authentication and authorization

Before starting this project, I learned the concepts of `identification`, `authentication`, and `authorization`. I studied the differences between these fundamental concepts of security and privacy. By understanding these concepts, I was able to apply them effectively to the project. Additionally, I looked at different examples to understand how these concepts are used in real-world scenarios. All of this helped me to feel confident when working on this project.

---

&hearts; thanks to yandex practicum team
