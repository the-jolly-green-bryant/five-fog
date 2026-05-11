# five-fog

Sample Ionic React Frontend w/ Static Page Rendering &amp; CI/CD

Demos available here:

- [Website](https://five-fog.bryantjames.com/)
- [Android App]()

# Usage

## Initial Setup

```shell
pnpm install
pnpm exec husky init
```

## Running Dev Server

```shell
pnpm run dev
```

## Production Build

```shell
pnpm run build
```

> Note: Production builds should be run through pnpm to ensure that all static files
> are included with the deliverable.

# Target Features

- Update readme
- Release android apk

# Topics To Discuss

- Main Driving Features
    - Strong search functionality
    - cross platform
    - static website rendering (automatically builds 1370 pages)
    - Language selection
- Approach, showcasing that end-to-end thinking, limited testing in lieu of features
- Initial setups, planning good practice early
- Framework selection
- Devops selection
- Going through considerations
    - API - A little cheating, knowing static rendering.

# Would Do

- Usability issues
    - search as url param
    - caching api and image requests
    - full static rendering
    - first-paint
- Localization
    - Localization to url param
    - Localize all text
    - Localize meta
    - Search by localized name
    - Fallback to English
- Content corrections
    - Mega evolutions have the correct id for API, but nopt the correct numerical representation as it apepars in the
      game

# Compromises

## Unit Testing

Typically, with a more real-world project I would have a strong foundation of testing,
and would give strong consideration to test-driven development. Given the nature of this
project and the simplicity of features, I opted to forgo testing in lieu of greater
feature depth.

## Error Handling on PokeAPI

As the project got long-in-the-ear, I opted to jettison error handling on PokeAPI calls
and naively assume they return valid results. This is a fairly safe assumption, but
obviously we'd prefer proper error handling.

## Search

The provided API does not feature any significant form of search or filtering. To
incorporate more robust and maintainable search functionality, I opted to leverage a
static 'master' list of Pokemon. This seemed a reasonable compromise as the rate that
new Pokemon are released is very low.

## Localization

Given the availability of localized labels, it was tempting to surface a language
selector. The localization feature is more of a sampler, it does not contain full
translations for the app, just what was readily available. Given time, I'd also add a
fallback to English, as there is not always a translation for each language.

# References

## [PokeApi](https://github.com/PokeAPI/pokeapi/)

An open-source API for quickly querying Pokemon information.

## [Ionic](https://ionicframework.com/)

A cross-platform development framework supporting React.
