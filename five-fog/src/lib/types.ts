export type Pokemon = {
    name: string
    id: number
    sprites: {
        other: {
            'official-artwork': {
                front_default: string | null
            }
        }
    }
    types: {
        type: {
            name: string
        }
    }[]
    cries: {
        latest: string
    }
    species: {
        names: {
            name: string
            language: {
                name: string
            }
        }[]
        color: {
            name: string
        }
        genera: {
            genus: string
            language: {
                name: string
            }
        }[]
        evolves_from_species?: Pokemon
        flavor_text_entries: {
            language: {
                name: string
            }
            flavor_text: string
        }[]
    }
    prev: Pokemon
    next: Pokemon
}

export type Kind = {
    name: string
    names: {
        name: string
        language: {
            name: string
        }
    }[]
}
