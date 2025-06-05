# Development Setup

This document outlines the steps to set up the development environment for the Flow Builder & Executor project.

## Prerequisites

*   Node.js (specify version, e.g., v18.x or later)
*   npm or yarn (Ensure you have `nodemon` installed globally or use `npx nodemon` for the dev script, or install it as a dev dependency in backend-api)
*   Git

## Getting Started

1.  **Clone the repository:**
    `git clone <repository-url>`
    `cd flow-builder-executor`

2.  **Install root dependencies (if any, for monorepo tools etc.):**
    `(This section can be removed if no root dependencies are planned yet)`
    `# npm install`
    `# yarn install`

3.  **Set up Backend API:**
    *   Navigate to the backend API directory: `cd backend-api`
    *   Create your local environment file: `cp .env.example .env`
    *   Update `.env` with your local settings (e.g., `DATABASE_URL`, `PORT`).
    *   Install dependencies: `npm install` (or `yarn install`)
    *   Return to the root directory: `cd ..`

4.  **Set up Flow Builder (Frontend):**
    *   Navigate to the Flow Builder directory: `cd flow-builder`
    *   Install dependencies: `npm install` (or `yarn install`) (This will require a `package.json` in `flow-builder` later)
    *   Return to the root directory: `cd ..`

5.  **Set up Flow Executor (Component/Library):**
    *   Navigate to the Flow Executor directory: `cd flow-executor`
    *   Install dependencies: `npm install` (or `yarn install`) (This will require a `package.json` in `flow-executor` later)
    *   Return to the root directory: `cd ..`

## Running the applications

*   **Flow Builder:**
    `cd flow-builder`
    `npm start` (This script needs to be defined in `flow-builder/package.json`)
*   **Flow Executor (Example Host Application):**
    *(Details TBD based on how executor is hosted/tested)*

*   **Backend API:**
    *   Navigate to `cd backend-api`
    *   To run in development mode (with auto-restarts via nodemon): `npm run dev`
    *   To run in production mode: `npm start`
    *   The API will typically be available at `http://localhost:PORT` (e.g., `http://localhost:3001`).

## Running Tests

*   **Backend API Tests:**
    `cd backend-api`
    `npm test` (This script needs to be defined/updated in `backend-api/package.json`)
*   *(Add sections for Flow Builder and Flow Executor tests when applicable)*

## Linting and Formatting

*(Details TBD - e.g., ESLint, Prettier setup)*
