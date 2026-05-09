import {useCallback, useEffect, useRef, useState} from 'react'
import POKEMON_LIST from '../index/master.json'

// Since we're utilizing the static list of Pokemon for search and filtering, we're
//  doing a little bit of hoodoo here to emulate an API integration.

export const usePokemonByType = ({name, search = ''}: { name: string, search: string }) => {
    const [list, setList] = useState<typeof POKEMON_LIST>([])
    const [error, setError] = useState<Error | null>(null)

    const loading = useRef(false)

    const normalizedSearch = search.trim().toLowerCase()

    console.log('name', name)

    const _loadMore = async () => {
        if (loading.current) {
            return
        }

        loading.current = true
        setError(null)
        const response = await fetch(
            `https://pokeapi.co/api/v2/type/${name}`
        )

        const data = await response.json()

        setList(data.pokemon.map((k: { pokemon: typeof POKEMON_LIST[0] }) => k.pokemon))
        loading.current = false
    }

    const loadMore = useCallback(_loadMore, [])

    useEffect(() => {
        setList([])
        void loadMore()
    }, [normalizedSearch, name])

    return {
        list, loading: loading.current, error, loadMore,
        hasMore: false,
    }
}