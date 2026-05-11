# five-fog

A cross-platform Pokédex built with Ionic React, featuring static page rendering, fuzzy
search, localization support, and automated CI/CD deployment.

## Live Demos

- Website: https://five-fog.bryantjames.com
- Android APK: https://github.com/the-jolly-green-bryant/five-fog/releases
- Source Repository: https://github.com/the-jolly-green-bryant/five-fog

---

# Project Goals

This project was intentionally scoped as a small but production-minded frontend exercise
built around the PokéAPI.

The goal was not just to satisfy the assignment requirements, but to demonstrate the
broad array of my competencies, including:

- end-to-end product thinking
- maintainable frontend architecture
- performance considerations
- cross-platform delivery
- CI/CD automation
- pragmatic engineering tradeoffs under time constraints

---

# Core Driving Considerations

Rather than treating this as a simple API exercise, I approached the project around a
few larger architectural and product goals that influenced most implementation
decisions.

## Strong Search Experience

The PokéAPI itself does not provide especially rich search functionality, so I treated
search as a first-class feature rather than a simple text filter.

This influenced:

- maintaining a local indexed Pokémon dataset
- implementing fuzzy matching with Fuse.js
- reducing dependence on live API filtering
- balancing responsiveness with simplicity

The goal was to create a search experience that feels fast and forgiving rather than
strictly API-driven.

## Cross-Platform Delivery

I wanted the project to demonstrate portability beyond a traditional web-only React
application.

The application is built with Ionic React and Capacitor, allowing the same frontend
architecture to target:

- web
- mobile web
- Android APK deployment

This also influenced UI/layout decisions and dependency selection early in the project.

## Static Rendering & SEO

One of the more interesting constraints was balancing a client-side React application
with SEO and first-paint performance considerations.

The production build statically renders over 1300 Pokémon pages, generating:

- prerendered HTML
- metadata
- OpenGraph tags
- sitemap entries

This significantly improves:

- search engine indexing
- social previews
- perceived performance
- non-JavaScript rendering behavior

It also created interesting challenges around Ionic styling and hydration.

## Localization

PokéAPI exposes a surprising amount of localization data, so I wanted to explore how
language selection could shape the application architecture.

The current implementation includes:

- shared language state
- localized Pokémon naming
- runtime language switching

Given more time, I would expand this into:

- localized routes
- localized metadata
- fallback language handling
- localized search indexing

---

# Technical Stack

## Frontend

- React
- Ionic
- TypeScript

## Tooling

- pnpm
- Capacitor
- GitHub Actions
- Cloudflare Pages

## Mobile

The Android APK is generated using Capacitor and Gradle.

This implementation is currently closer to a deployment proof-of-concept than a fully
polished mobile application, but demonstrates the portability of the frontend
architecture.

---

# CI/CD

GitHub Actions automatically:

- builds the web application
- statically renders pages
- generates Android APKs
- deploys the website to Cloudflare Pages
- uploads APK artifacts
- creates GitHub Releases for tagged versions

---

# Local Development

## Install

```shell
pnpm install
pnpm exec husky init
```

## Run Development Server

```shell
pnpm run dev
```

## Production Build

```shell
pnpm run build
```

## Build Android APK

```shell
pnpm run build:apk
```

---

# Tradeoffs & Constraints

## Testing

In a production environment, I would normally prioritize:

- stronger automated testing
- integration coverage
- potentially test-driven workflows

Given the intentionally constrained timeline for this exercise, I chose to prioritize:

- feature completeness
- architecture
- deployment pipeline

over deep test coverage.

## API Assumptions

Some PokéAPI calls intentionally assume valid responses rather than implementing
exhaustive defensive handling.

For a production application, I would expand:

- retry handling
- caching strategy
- API fallbacks
- loading state recovery
- offline behavior

## Performance

Several optimizations were intentionally explored:

- static prerendering
- local caching
- fuzzy search indexing
- critical CSS rendering
- reduced dependency on live API search

There are still opportunities for further optimization, particularly around:

- image caching
- API response persistence
- full route-level static generation
- more aggressive code splitting

---

# Assignment Notes

The original assignment requested:

- React app
- Pokémon API integration
- card display
- filtering
- pagination

This implementation intentionally expanded beyond those requirements to demonstrate
broader engineering considerations such as:

- SEO
- CI/CD
- mobile deployment
- localization
- rendering strategy
- platform portability

---

# References

## PokeAPI

https://github.com/PokeAPI/pokeapi/

An open-source API for querying Pokémon information.

## Ionic

https://ionicframework.com/

Cross-platform application framework for React and mobile deployment.
