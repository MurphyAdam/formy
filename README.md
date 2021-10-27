# Formy

This is a simple places search app made with the help of Google Places

This project is split into two parts: Front-end (client) and back-end (server)
The docs below shall help you get started to run the application on your local machine, or deploy it.

## Stack

This project uses the following stack:

1. Python
2. JavasScript/ TypeScript
3. Django and Django-rest-framework
4. React + Redux
5. REST
6. Material-UI/ CSCC

## Demo

https://formy-search.herokuapp.com/

## Get started

If you would like to run the build without installing the client side (Node modules), 
Please skip the Client part below

### Client

If you would like to run the client server, please make sure you have the latest Node.js version >= 16,
alongside a package manager such as `yarn` or `npm` (this project uses yarn), and follow the steps below:

1. in the root directory of `client` where the package.json file is located, use your favourite package 
manager to install the client dependencies. E.g: `yarn` or `npm install`

2. spin the development server up.
in your terminal, according to your package manager, run the local server by typing either `yarn start` 
or `npm run start`. This should start a local development server at 127.0.0.1, port 3000

### Backend

- Requirments:

    This project is written in `Python 3.9` using `django 3.2.8` and `django-rest-framework 3.12.4`

- Install:

    Please create a virtual environment and install the project requirements found in the file `requirements.txt`.

## Tests

- backend:
    To run the tests, please run `python manage.py test` in the server

- front-end: 
    To run the tests, please run `yarn test` in the client dir

