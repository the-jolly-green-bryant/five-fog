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
}

export type Kind = {
    name: string
}
