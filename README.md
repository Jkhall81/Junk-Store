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
