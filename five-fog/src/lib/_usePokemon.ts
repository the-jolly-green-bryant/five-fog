import {useEffect, useState} from 'react'
import {Pokemon} from './types'

export const getPokemon = async (name: string) => {
    const normalizedName = name
        .toLowerCase()
        .replaceAll(/[^a-zA-Z0-9\- ]/g, '')
        .replaceAll(/\s+/g, '-')
    const r = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${normalizedName}`,
    )
    const data = await r.json()
    const r_species = await fetch(data.species!.url!)
    return {
        ...data,
        species: await r_species.json()
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