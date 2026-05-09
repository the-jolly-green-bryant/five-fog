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

# Target Features

- Index, scroll to paginate, filter
- View page
- Filter by click type
- CI/CD
- Static page rendering
- Accessibility feature
- Search - More robust

# Topics To Discuss

- Approach, showcasing that end-to-end thinking, limited testing in lieu of features
- Initial setups, planning good practice early
- Framework selection
- API - A little cheating, knowing static rendering.

# Compromises

## Unit Testing

Typically with a more real-world project I would have a strong foundation of testing,
and would give strong consideration to test-driven development. Given the nature of this
project and the simplicity of features, I opted to forgo testing in lieu of greater
feature depth.

## Search

The provided API does not feature any significant form of search or filtering. To
incorporate more robust and maintainable search functionality, I opted to leverage a
static 'master' list of Pokemon. This seemed a reasonable compromise as the rate that
new Pokemon are released is very low.

# References

## [PokeApi](https://github.com/PokeAPI/pokeapi/)

An open-source API for quickly querying Pokemon information.

## [Repokémon](https://github.com/cheeaun/repokemon)

The Repokémon repo contains an automatically updated, static list of all Pokémon. We
leveraged this resource for filtering cases that weren't directly supported by the
PokeApi.

> Note: Given that we already have an up-to-date and evergreen copy of information
> locally, I'd normally be inclined to rely solely on that local data. Given the nature
> of the task, I've opted to use the local source solely for filtering and search.
