import {useCallback, useEffect, useRef, useState} from 'react'
import POKEMON_LIST from '../index/master.json'
import Fuse from 'fuse.js'

// Since we're utilizing the static list of Pokemon for search and filtering, we're
//  doing a little bit of hoodoo here to emulate an API integration.

export const useListPokemon = ({search = ''}: { search: string }) => {
    const [list, setList] = useState<typeof POKEMON_LIST>([])
    const [next, setNext] = useState<number | null>(0)
    const [error, setError] = useState<Error | null>(null)

    const loading = useRef(false)
    const limit = 20

    const normalizedSearch = search.trim().toLowerCase()
    const fuse = new Fuse(POKEMON_LIST, {
        keys: ['name'],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
    })

    const _loadMore = async (offset: number) => {
        if (offset === null || loading.current) {
            return
        }

        loading.current = true
        setError(null)
        const data = fuse
            .search(normalizedSearch)
            .map(result => result.item)
            .slice(offset, offset + limit)

        setNext(data.length == limit ? offset + limit : null)
        setList((previous) => [
            ...previous,
            ...data,
        ])
        loading.current = false
    }

    const loadMore = useCallback(async () => {
        if (next === null) return
        await _loadMore(next)
    }, [next, _loadMore])

    useEffect(() => {
        setList([])
        setNext(0)
        void _loadMore(0)
    }, [search, normalizedSearch])

    return {
        list, loading: loading.current, error, loadMore,
        hasMore: next !== null,
    }
}