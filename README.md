# my-nhl

I like hockey. I like watching NHL games, but since I live on the other side of the Atlantic, most games are played during the night. This means two things:

1. While I technically could watch games live, I won't. Some of us have work in the morning.
2. Chores are done, the kids are tucked in, and I want to see if there's a game I'd like to watch. This is where I need to be extremely careful. I'll open the NHL app, squint until I can only recognize which teams have played by their logo colors, all while keeping a fingertip over the part of the screen where I hope the scores are showing. I got sick of it.

Meet **my-nhl**.

A spoiler-free NHL scoreboard built with Next.js and TypeScript.

The application consumes the Highlightly Hockey REST API to retrieve NHL match data and displays games grouped by date in a clean, responsive interface.

The main goal of this project is to gain practical experience working with REST APIs, handling external data, and building a modern web application. And to watch some exciting hockey.

## Features

- Fetches NHL match data from the Highlightly Hockey API.
- Displays games grouped by date (yesterday, today, and tomorrow).
- Converts match dates and times to the Europe/Stockholm timezone.
- Displays home and away teams with their logos.
- Shows match status: upcoming, live, and finished.
- Hides scores by default to avoid spoilers.
- Allows users to reveal and hide match scores on demand.

## Tech Stack

- **Next.js** – React framework
- **React** – UI library
- **TypeScript** – Static typing
- **Tailwind CSS** – Styling
- **Highlightly Hockey API** – External NHL data provider
- **RapidAPI** – API access and authentication
- **Vitest** – Unit testing
- **React Testing Library** – Component testing
- **Postman** - API testing and scripted test automation

## API Integration

The application communicates with the Highlightly Hockey API through server-side API requests.

API credentials are stored in environment variables and are not exposed to the client.

## Testing

The project uses Vitest for automated testing, React Testing Library for testing React components, and Postman for API testing.

The test suite covers:

- API requests, query parameters, headers, and error handling.
- Match data retrieval for yesterday, today, and tomorrow.
- Component rendering and match status display.
- Score visibility and spoiler-prevention functionality.
- User interactions for revealing and hiding scores.

The project includes a Postman collection with requests for API endpoint verification and a small suite of scripted tests. Collection is found in:

`NHL-API-Highlightly.postman_collection.json`

Run the automated tests with:

```bash
npx vitest run
```

## Getting Started

### Prerequisites

- Node.js
- npm
- A RapidAPI account with access to the Highlightly Hockey API

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd my-nhl
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Add your RapidAPI key to `.env.local`:

```env
RAPIDAPI_KEY=your_rapidapi_key_here
```

### Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Status

This project is under active development.

Potential future improvements include expanding automated test coverage and setting up continuous integration with GitHub Actions.