#  ISS Live Tracker

A real-time web application that tracks the International Space Station (ISS) on an interactive world map.

Built with **ASP.NET Core (C#)**, **JavaScript**, **HTML**, **CSS**, and **Leaflet.js**.

## Features

-  Interactive map showing the current ISS location.
-  Live latitude and longitude coordinates.
-  Real-time altitude and velocity information.
- Automatic position updates.
-  API connection status and last successful update time.
-  Error handling, request timeouts, and API response validation.
-  Responsive interface for desktop and mobile devices.
-  ASP.NET Core backend endpoint for retrieving ISS data.

## Tech Stack

**Backend**
- C#
- ASP.NET Core Minimal APIs
- HttpClient
- REST API integration

**Frontend**
- HTML5
- CSS3
- JavaScript
- Leaflet.js

**Development Tools**
- Visual Studio Code
- Git and GitHub
- Microsoft Edge DevTools

## Architecture

The application uses a frontend-backend architecture:

```text
Browser (HTML/CSS/JavaScript)
            |
            | GET /api/iss
            v
    ASP.NET Core API (C#)
            |
            | HTTP request
            v
     External ISS Data API
            |
            | JSON response
            v
    ASP.NET Core -> Browser
```

## Getting Started

### Prerequisites

- .NET SDK compatible with the project's target framework
- Git
- A modern web browser

### Run locally

1. Clone the repository:

```bash
git clone https://github.com/MohamadRidaa/IssTracker.Api.git
```

2. Navigate into the project:

```bash
cd IssTracker.Api
```

3. Start the application:

```bash
dotnet run
```

4. Open the local URL shown in the terminal.

The frontend must be opened through the ASP.NET Core server, not a separate static-file development server.

## API Endpoint

### `GET /api/iss`

Returns the latest ISS data as JSON.

**Response fields:**

| Field | Description |
|---|---|
| `latitude` | ISS latitude in degrees |
| `longitude` | ISS longitude in degrees |
| `altitude` | ISS altitude in kilometers |
| `velocity` | ISS velocity in kilometers per hour |
| `timestamp` | Unix timestamp of the observation |

The backend retrieves the information from the external ISS data provider and returns it to the frontend.

## Future Improvements

- Automated testing and GitHub Actions CI
- Live application deployment
- Additional ISS tracking features

## Data Source

ISS position data is provided by [Where the ISS at?](https://wheretheiss.at/).