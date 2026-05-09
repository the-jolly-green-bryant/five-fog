import {useEffect, useState} from 'react'
import {Kind} from './types'

export const useListKinds = () => {
    const [list, setList] = useState<Kind[]>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const loadPokemon = async () => {
            setLoading(true)
            setError(null)

            const LARGE_NUMBER = 100_000
            const response = await fetch(
                `https://pokeapi.co/api/v2/type?limit=${LARGE_NUMBER}`,
            )

            if (!response.ok) {
                setList(undefined)
                setError(new Error('Failed to load pokemon'))
                return
            }

            const data = await response.json()
            setList(data.results)
            setLoading(false)
        }

        void loadPokemon()
    }, [])

    return {list, loading, error}
}