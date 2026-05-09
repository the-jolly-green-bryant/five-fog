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

# Topics To Discuss

- Approach, showcasing that end-to-end thinking, limited testing in lieu of features
- Initial setups, planning good practice early
- Framework selection
- API - A little cheating, knowing static rendering.

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
