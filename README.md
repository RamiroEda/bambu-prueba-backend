# Bambu Mobile Backend Test

## Description

This is a simple Express API that allows you to register users and validate their emails. It also allows you to read the current user data.

## Installation

1. Clone the repository
2. Copy the `.env.example` file and rename it to `.env`
3. Fill the `.env` file with the required data
4. Run `yarn install` to install the dependencies
5. Run `yarn dev` to start the server

## Database Setup

This project uses SQLite as the database to make it easier to run the project.
To create the database, run `yarn prisma migrate deploy` and then `yarn prisma generate` to generate the Prisma Client.

## API Documentation

### Endpoints

#### POST /register

This endpoint allows you to register a new user. It requires the following data:

- `name`: The user's name
- `email`: The user's email
- `password`: The user's password

#### GET /verify-email/:token

This endpoint allows you to verify a user's email. It requires the following data:

- `token`: The token sent to the user's email

#### POST /current-user

This endpoint allows you to get the current user's data.

Headers:

- `Authorization`: The user's JWT token with the `Bearer` prefix
