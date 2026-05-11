import {useEffect, useState} from 'react'
import {Pokemon} from './types'
import POKEMON_LIST from '../index/master.json'

const STORAGE_PREFIX = 'five-fog.pokemon.'

export const getPokemon = async (name: string): Promise<Pokemon> => {
    const normalizedName = name
        .toLowerCase()
        .replaceAll(/[^a-zA-Z0-9\- ]/g, '')
        .replaceAll(/\s+/g, '-')
    const storageKey = `${STORAGE_PREFIX}${normalizedName}`

    const saved = localStorage.getItem(storageKey)
    if (saved) {
        return JSON.parse(saved)
    }

    const pokemon = await fetchPokemon(normalizedName)
    localStorage.setItem(storageKey, JSON.stringify(pokemon))

    return pokemon
}

const fetchPokemon = async (normalizedName: string): Promise<Pokemon> => {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${normalizedName}`)

    if (!r.ok) {
        throw new Error(`Failed to fetch Pokémon: ${normalizedName}`)
    }

    const data = await r.json()
    const rSpecies = await fetch(data.species!.url!)

    if (!rSpecies.ok) {
        throw new Error(`Failed to fetch species: ${normalizedName}`)
    }

    const index = POKEMON_LIST.findIndex(i => i.name === normalizedName)
    const prev = POKEMON_LIST.at(index - 1)
    const next = POKEMON_LIST.at((index + 1) % POKEMON_LIST.length)

    return {
        ...data,
        species: await rSpecies.json(),
        prev,
        next,
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