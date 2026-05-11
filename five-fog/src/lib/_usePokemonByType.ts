import {useEffect, useRef, useState} from 'react'
import POKEMON_LIST from '../index/master.json'
import Fuse from 'fuse.js'

// Since we're utilizing the static list of Pokemon for search and filtering, we're
//  doing a little bit of hoodoo here to emulate an API integration.

export const usePokemonByType = ({name, search = ''}: { name: string, search: string }) => {
    const [list, setList] = useState<typeof POKEMON_LIST>([])
    const [error, setError] = useState<Error | null>(null)

    const loading = useRef(false)

    const normalizedSearch = search.trim().toLowerCase()

    const _loadMore = async () => {
        if (loading.current) {
            return
        }

        loading.current = true
        setError(null)
        const response = await fetch(
            `https://pokeapi.co/api/v2/type/${name}`
        )

        const data: (typeof POKEMON_LIST) = (await response.json()).pokemon.map((k: {
            pokemon: typeof POKEMON_LIST[0]
        }): typeof POKEMON_LIST[0] => k.pokemon)
        const fuse = new Fuse(data, {
            keys: ['name'],
            threshold: 0.35,
            ignoreLocation: true,
            minMatchCharLength: 2,
        })

        setList(normalizedSearch ? fuse.search(normalizedSearch).map(result => result.item) : data)
        loading.current = false
    }

    const loadMore = () => _loadMore()

    useEffect(() => {
        setList([])
        void _loadMore()
    }, [normalizedSearch, name, search])

    return {
        list, loading: loading.current, error, loadMore,
        hasMore: false,
    }
}