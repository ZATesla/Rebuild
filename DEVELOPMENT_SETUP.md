# Development Setup

This document outlines the steps to set up the development environment for the Flow Builder & Executor project.

## Prerequisites

*   Node.js (specify version, e.g., v18.x or later)
*   npm or yarn
*   Git

## Getting Started

1.  **Clone the repository:**
    `git clone <repository-url>`
    `cd flow-builder-executor`

2.  **Install root dependencies (if any, for monorepo tools etc.):**
    `npm install`
    `# or`
    `yarn install`

3.  **Navigate to sub-projects and install their dependencies:**
    *   `cd flow-builder && npm install && cd ..`
    *   `cd flow-executor && npm install && cd ..`
    *   `cd backend-api && npm install && cd ..`
    *(These steps will be refined once each sub-project has its own package.json)*

## Running the applications

*   **Flow Builder:**
    `cd flow-builder`
    `npm start` (This script needs to be defined in `flow-builder/package.json`)
*   **Flow Executor (Example Host Application):**
    *(Details TBD based on how executor is hosted/tested)*
*   **Backend API:**
    `cd backend-api`
    `npm start` (This script needs to be defined in `backend-api/package.json`)

## Running Tests

*   `npm test` (This script needs to be refined to run tests in all sub-projects)

## Linting and Formatting

*(Details TBD - e.g., ESLint, Prettier setup)*
