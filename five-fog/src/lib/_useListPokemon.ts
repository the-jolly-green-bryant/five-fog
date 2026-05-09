import {useEffect, useRef, useState} from 'react'
import {Pokemon} from './types'
import {PokemonClient} from 'pokenode-ts'

const api = new PokemonClient()

type PokemonListResponse = {
    results: Pokemon[]
    next: string | null
}

export const useListPokemon = () => {
    const [list, setList] = useState<Pokemon[]>([])
    const [next, setNext] = useState<string | null>('https://pokeapi.co/api/v2/pokemon')
    const [error, setError] = useState<Error | null>(null)

    const loading = useRef(false)

    const loadMore = async () => {
        if (!next || loading.current) {
            return
        }


        loading.current = true
        setError(null)

        const url = new URL(next)
        const offset = Number(url.searchParams.get('offset') ?? 0)
        const limit = Number(url.searchParams.get('limit') ?? 20)
        const data: PokemonListResponse = await api.listPokemons(offset, limit)

        if (!data) {
            return setError(new Error('Failed to load pokemon'))
        }

        console.log('data', data)

        setNext(data.next)
        setList((previous) => [
            ...previous,
            ...data.results,
        ])
        loading.current = false
    }


    useEffect(() => {
        void loadMore()
    }, [])

    return {
        list, loading: loading.current, error, loadMore,
        hasMore: next !== null,
    }
}