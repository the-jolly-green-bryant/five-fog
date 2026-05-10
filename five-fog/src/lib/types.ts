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
}

export type Kind = {
    name: string
}
