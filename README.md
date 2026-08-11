# EcoLearn

EcoLearn is a mobile-first climate learning hub supporting the Group 5 SDG 13.3 Instagram awareness campaign. The planned experience combines curated climate updates, daily and weekly quizzes, practical eco-actions, and campaign learning analytics.

This repository is a clean application skeleton. Feature-specific models, routes, and interfaces will be introduced incrementally.

## Stack

- React 19 and Vite
- Chakra UI
- Node.js and Express
- MongoDB and Mongoose

## Local setup

1. Install dependencies:

   ```bash
   npm install
   npm install --prefix frontend
   ```

2. Copy `.env.example` to `.env` and replace `MONGO_URI` if using MongoDB Atlas.

3. Start the backend:

   ```bash
   npm run dev
   ```

4. In a second terminal, start the frontend:

   ```bash
   npm run dev --prefix frontend
   ```

The frontend runs through Vite and proxies `/api` requests to `http://localhost:5050`.

## Available commands

- `npm run dev` - run the Express API with Nodemon
- `npm run build` - build the frontend
- `npm run start` - serve the production application
- `npm run lint` - lint the frontend
- `npm run check` - lint and build the application

## Current API

- `GET /api/health` - verify that the EcoLearn API is available

## Planned modules

- Curated climate updates
- Daily and weekly quizzes
- Pre- and post-campaign knowledge assessments
- Eco-action challenges
- Anonymous participation and learning analytics
