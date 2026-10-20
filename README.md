# Stadionhopper

A small prototype with a static HTML/CSS/JavaScript frontend and a Node.js HTTP API.

## Requirements

- Node.js 18 or newer.
- Git, if you are cloning the repository.
- No third-party Node packages are required for the current API or test suite.

## Run locally

1. Clone the repository and enter its directory.
2. Start the API server:

   ```sh
   node server.js
   ```

3. The API listens on `http://localhost:3000` by default. Set `PORT` to use another port, for example `PORT=4000 node server.js`.
4. Open `index.html` in a browser to view the current static prototype. The frontend is still a visual prototype and is not yet wired to every API endpoint.

## API endpoints

- `GET /api/matches` — lists available matches with club and stadium details.
- `GET /api/matches/:match_id` — returns one match or a 404 response.

The server reads the existing files in `Database/`. Those files currently contain placeholder rows and Python-style `None` values/trailing commas; the API normalizes this existing format when reading and does not rewrite the source files. As a result, a clean checkout may return an empty list until valid match data is added.

## Tests

Run the built-in Node.js test runner:

```sh
node --test test/*.test.js
```

Tests use temporary fixture files and do not modify the real files under `Database/`.

## Configuration and security

- `PORT` optionally configures the API listening port.
- `STADIONHOPPER_DB_DIR` optionally points the API at a directory containing the JSON tables; by default it uses `Database/` in this repository.
- Do not commit passwords, tokens, or other secrets. Authentication and persistent user sessions are not implemented yet.

## Current limitations

The UI still contains illustrative example content. Authentication, user-specific check-ins, profile history, and the social feed frontend/backend integration are not yet complete. Do not treat the example content as production data.
