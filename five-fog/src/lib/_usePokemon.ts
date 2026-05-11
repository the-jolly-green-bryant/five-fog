import {useEffect, useState} from 'react'
import {Pokemon} from './types'
import POKEMON_LIST from '../index/master.json'

export const getPokemon = async (name: string) => {
    const normalizedName = name
        .toLowerCase()
        .replaceAll(/[^a-zA-Z0-9\- ]/g, '')
        .replaceAll(/\s+/g, '-')

    // Fetch pokemon data from API
    const r = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${normalizedName}`,
    )
    const data = await r.json()
    const r_species = await fetch(data.species!.url!)

    // Reference pagination from local index file
    const index = POKEMON_LIST.findIndex(i => i.name === normalizedName)
    const prev = POKEMON_LIST.at(index - 1)
    const next = POKEMON_LIST.at(index + 1 - POKEMON_LIST.length)

    return {
        ...data,
        species: await r_species.json(),
        prev,
        next
    }
}

export const usePokemon = (name: string | null) => {
    const [pokemon, setPokemon] = useState<Pokemon>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!name) {
            setPokemon(undefined)
            return
        }

        const loadPokemon = async () => {
            setLoading(true)
            setError(null)

            const data = await getPokemon(name)
            setPokemon(data)
            setLoading(false)
        }

        void loadPokemon()
    }, [name])

    return {pokemon, loading, error}
}