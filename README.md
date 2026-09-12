# Wanderlust

Wanderlust is a Node.js + Express travel listing application inspired by Airbnb. Users can browse vacation stays, create listings, edit or delete their own properties, leave reviews, and sign up/log in securely with Passport.js.

## Features

- Browse all travel listings on the homepage
- Create, update, and delete property listings
- Upload listing images via Cloudinary
- User authentication with signup/login/logout
- Review and rating system for listings
- Flash messages and session-based user state
- MongoDB-backed data persistence

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS templates
- Passport.js + Passport Local
- Cloudinary for image uploads
- Express Session + Connect Mongo
- Joi validation

## Project Structure

- `app.js` — application entry point and server setup
- `routes/` — route handlers for listings, reviews, and users
- `controllers/` — logic for listing and user actions
- `models/` — Mongoose schemas for `Listing` and `User`
- `views/` — EJS templates for the UI
- `public/` — static assets such as CSS and images
- `middlewares/` — authentication and validation middleware
- `utils/` — utility helpers
- `cloudConfig.js` — Cloudinary configuration

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string
- A Cloudinary account for image uploads

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

If you are using a local MongoDB instance instead of Atlas, update the database connection value accordingly in `app.js` or configure your own connection flow.

## Installation

```bash
npm install
```

## Run the app

```bash
node app.js
```

The app runs on port `8080` by default.

Open the app in your browser at:

```text
http://localhost:8080
```

## Usage

1. Sign up for a new account.
2. Log in to create or manage listings.
3. Add a home, location, description, price, and image.
4. Explore listings and leave reviews.

## Notes

- The project currently uses `app.js` as the entry point rather than a separate `index.js`.
- There is no automated test suite configured in `package.json` yet.
- Image uploads are stored in Cloudinary under the `wanderlustDEV` folder.

## License

This project is licensed under the ISC license.
