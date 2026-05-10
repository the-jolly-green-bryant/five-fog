import {useEffect, useState} from 'react'
import {Pokemon} from './types'

export const getPokemon = async (name: string) => {
    const normalizedName = name
        .toLowerCase()
        .replaceAll(/[^a-zA-Z0-9\- ]/g, '')
        .replaceAll(/\s+/g, '-')
    return fetch(
        `https://pokeapi.co/api/v2/pokemon/${normalizedName}`,
    )
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
            
            const response = await getPokemon(name)

            if (!response.ok) {
                setPokemon(undefined)
                setError(new Error('Failed to load pokemon'))
                return
            }

            const data = await response.json()
            setPokemon(data)
            setLoading(false)
        }

        void loadPokemon()
    }, [name])

    return {pokemon, loading, error}
}