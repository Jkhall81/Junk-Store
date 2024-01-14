# Junk-Store Ecommerce Project

Junk Store is an Ecommerce store built with React, Redux, React Router, and React Bootstrap for the frontend. The backend is implemented using Django, Django Rest Framework, and Gunicorn. The database is powered by PostgreSQL and the project is hosted on Render (backend) and Vercel (frontend).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Frontend](#frontend)
- [Backend](#backend)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Deployment](#deployment)
- [Testing](#testing)
- [License](#license)

## Features

The site has paypal functionality and uses a paypal button to allow users to make payments via paypal or a debit/creditcard. User login and authorization is handled with JWT access and refresh tokens. Routing is handled with react router. Redux is used for state management. All API calls are made using Redux RTK query. Staticfile management is handled with whitenoise. Users can register for an account, make purchases, view purchase / order history, change their own profile information, and make comments on products. If a user has admin status they can upload products to the store, view user's info, view order info, and delete users or products. Admin only routes are protected, and if non admin users try to access them they are redirected to the login page.

## Technologies

- Frontend

  - paypal/react-paypal-js
  - reduxjs/toolkit
  - react / Vite
  - react-bootstrap
  - react-redux
  - react-router-bootstrap
  - react-router-dom

- Backend
  - dj-database-url
  - Django
  - django-cors-headers
  - djangorestframework
  - djangorestframework-simplejwt
  - drf-yasg
  - gunicorn
  - Pillow
  - psycopg2-binary
  - whitenoise

## Getting Started

The Project code can be found here: https://github.com/Jkhall81/Junk-Store.
The project has a Docker Postgres container that you can use on your local machine if you wish. You just need to modify the settings.py file to get the Django API to connect to it. Also the RTK Query base url, located in the frontend/src/redux/services/api.js needs to be changed to get the application to run on your local machine.

## Frontend

This project uses react and the build tool Vite for the front end. React Router is used for routing, Redux is used for state management, and Redux RTK Query is used to make all API calls. React Bootstrap is used to make most of the user interface.

https://junk-store.vercel.app/

## Backend

The backend uses Django and the Django Rest Framework. Most of the API endpoints use modelviewsets. They are very easy to use and require very little code to set up. There are also dependencies to hook the API up to a postgres dababase. Pillow for working with image files. DRF-YASG is used to implement swagger API documentation. JWTs are used for user login, and API access authorization. Gunicorn is used as a server.

https://junkstore-backend.onrender.com/

## API Documentation

Swagger is used to provide API documentation. It can be accessed via this url:
https://junkstore-backend.onrender.com/swagger/
All endpoints are shown, with nice easy to read examples on how to use each endpoint. Swagger is great.

## Database

In development a Docker postgres container was used. For deployment the application is using a postgres database hosted on Render. Nothing really special about the database. Models were created using Django, the Django ORM is used to access the database. Right now the application doesn't have a backup.

## Deployment

The front end is deployed on a free Vercel account. The Backend, both the API and the postgres atabase, is deployed on a paid render account.

## Testing

Work in progress.

## License

This project use an MIT license.
