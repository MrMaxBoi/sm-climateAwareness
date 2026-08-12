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

   Set `ANALYTICS_KEY` to a long random value before accessing protected aggregate analytics.

3. Start the backend:

   ```bash
   npm run dev
   ```

4. In a second terminal, start the frontend:

   ```bash
   npm run dev --prefix frontend
   ```

The frontend runs through Vite and proxies `/api` requests to `http://localhost:5050`.

5. Seed the starter campaign content once MongoDB is running:

   ```bash
   npm run seed
   ```

## Available commands

- `npm run dev` - run the Express API with Nodemon
- `npm run build` - build the frontend
- `npm run start` - serve the production application
- `npm run lint` - lint the frontend
- `npm test` - run backend unit tests
- `npm run seed` - safely upsert starter campaign content
- `npm run check` - test, lint, and build the application

## Current API

- `GET /api/health` - verify that the EcoLearn API is available
- `GET /api/updates` - list published climate updates
- `GET /api/quizzes/active?type=daily|weekly` - get an active quiz without its answer key
- `GET /api/quizzes/active?type=assessment&phase=pre|post` - get an assessment
- `POST /api/quizzes/:quizId/attempts` - submit and grade one anonymous attempt
- `GET /api/actions/active` - list active eco-actions and completion state
- `PUT|DELETE /api/actions/:actionId/completion` - update action completion
- `GET /api/progress` - retrieve anonymous participant progress
- `POST /api/activity/visit` - record an anonymous visit
- `GET /api/analytics/summary` - retrieve protected aggregate campaign metrics

Participant-aware endpoints require an anonymous UUID in the `X-Participant-ID` header. Analytics requires `X-Analytics-Key` matching the server environment.

## Administration

The private administration interface is available only by entering `/admin` directly. It is not linked from public navigation. Set a strong `ADMIN_KEY` in the environment, enter it on the admin page, and use the JSON editor to create or update climate updates, quizzes, and eco-actions. Publish content by changing its `status` after review; the interface intentionally provides no destructive delete operation.

## Railway preparation

`railway.json` configures the production build, start command, and `/api/health` deployment check. Configure `MONGO_URI`, `ADMIN_KEY`, `ANALYTICS_KEY`, and optionally `PORT` through Railway Variables. Never commit their real values.

Campaign timing and Instagram integration are configured with `CAMPAIGN_NAME`, `CAMPAIGN_START`, `CAMPAIGN_END`, and `INSTAGRAM_URL`. Re-run `npm run seed` after changing campaign dates so scheduled starter quizzes and actions receive the updated window.

EcoLearn presents a privacy choice before recording optional visits or article views. Quiz, assessment, action, and feedback records remain essential anonymous progress data. The admin analytics export uses paired pre/post results, so only participants who completed both assessments contribute to the reported learning change.

## Planned modules

- Curated climate updates
- Daily and weekly quizzes
- Pre- and post-campaign knowledge assessments
- Eco-action challenges
- Anonymous participation and learning analytics
