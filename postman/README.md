# Postman API Tests

This folder contains a Postman collection for testing the Highlightly Hockey API.

## Included requests

- **Get NHL Standings** – retrieves NHL standings for the 2026 season.
- **Get NHL Matches** – retrieves NHL matches for a specified date.

Both requests include automated tests that validate the HTTP status code and the structure of the API response.

## Setup

1. Import `NHL-API-Highlightly.postman_collection.json` into Postman.
2. Create a Postman environment named `NHL Local`.
3. Add an environment variable:
   - **Variable:** `rapidapi_key`
   - **Value:** Your RapidAPI key
4. Select the `NHL Local` environment in Postman.

The API key is stored locally in your Postman environment and is not included in this repository.

## Running the tests

1. Open the imported collection in Postman.
2. Make sure the `NHL Local` environment is selected.
3. Open the collection's menu and select **Run**.
4. Run the collection to execute all requests and their associated tests.

Each request displays its test results in the Postman test results panel.

## API information

- **API provider:** Highlightly
- **API access:** RapidAPI
- **API host:** `hockey-highlights-api.p.rapidapi.com`