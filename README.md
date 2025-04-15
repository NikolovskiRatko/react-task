# Introduction

This repository is a demonstration of Next.js skills by building a small application that demonstrates how to implement packages, feature flags, unit tests, dockerization etc.

# Steps to run

## Build application

In order to build the application you need to have Docker and Docker Compose installed locally and run this command:

``
docker compose -f .docker/docker-compose.yml up --build
``

## Test in browser

By visiting

``http://localhost:3000/`` for Project A


``http://localhost:3001/`` for Project B

To visit one of the Market pages add 'en or 'ca' to the URL:

``http://localhost:3000/en`` or ``http://localhost:3001/en``

From here the menu navigation will allow you to visit the example pages.

To test the Login page ``http://localhost:3000/en/login`` use these credentials:

username: alice

password: secret


## Unit tests

In order to run the Jest unit tests first log in to the docker container:

``
docker compose -f .docker/docker-compose.yml exec project-a sh
``

and then run the following command:

``
pnpm --filter project-a test
``