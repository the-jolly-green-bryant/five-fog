# five-fog

Sample Ionic React Frontend w/ Static Page Rendering &amp; CI/CD

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

- Search - More robust
- Language selector
- Inline javascript
- Meta - more relevant meta
- Update readme
- Ionic theme

# Topics To Discuss

- Approach, showcasing that end-to-end thinking, limited testing in lieu of features
- Initial setups, planning good practice early
- Framework selection
- API - A little cheating, knowing static rendering.

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

# References

## [PokeApi](https://github.com/PokeAPI/pokeapi/)

An open-source API for quickly querying Pokemon information.

## [Ionic](https://ionicframework.com/)

A cross-platform development framework supporting React.
