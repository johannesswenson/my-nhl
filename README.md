# my-nhl

I like hockey. I like to watch NHL games but since I live on the other side of the Atlantic ocean, most games are played durung the night. This means two things:

1. While I technically could watch games live, I won't. Some of us have work in the morning.

2. Chores are done, the kids are tucked in, and I wan't to see if there's a game I'd want to watch. This is where I need to be extremely careful. I'll open the NHL app, squint to the point where I can only tell which teams have played a game by recognizing the colors of the logo, all while I'm keeping a finger tip over where I hope the scores are showing. I got sick of it.

Meet my-nhl.

A spoiler-free NHL scoreboard built with Next.js and TypeScript.

The application consumes the Highlightly Hockey REST API to retrieve NHL match data and displays games grouped by date in a clean, responsive interface.

The main goal of this project is to gain some practical experience working with REST APIs, handling external data, and building a modern web application. And watch some exiting hockey.

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

## API Integration

The application communicates with the Highlightly Hockey API through server-side API requests.

API credentials are stored in environment variables and are not exposed to the client.

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

Future improvements include automated API testing, test collections in Postman, and continuous integration with GitHub Actions.