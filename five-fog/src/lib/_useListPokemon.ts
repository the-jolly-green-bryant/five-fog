import {useEffect, useRef, useState} from 'react'
import {Pokemon} from './types'
import POKEMON_LIST from '../index/master.json'

// Since we're utilizing the static list of Pokemon for search and filtering, we're
//  doing a little bit of hoodoo here to emulate an API integration.

export const useListPokemon = () => {
    const [list, setList] = useState<Pokemon[]>([])
    const [next, setNext] = useState<number | null>(0)
    const [error, setError] = useState<Error | null>(null)

    const loading = useRef(false)
    const limit = 20

    const loadMore = async () => {
        if (next === null || loading.current) {
            return
        }

        loading.current = true
        setError(null)
        const data = POKEMON_LIST.slice(next, next + limit)

        setNext(data.length == limit ? next + limit : null)
        setList((previous) => [
            ...previous,
            ...data,
        ])
        loading.current = false
    }


    useEffect(() => {
        void loadMore()
    }, [loadMore])

    return {
        list, loading: loading.current, error, loadMore,
        hasMore: next !== null,
    }
}