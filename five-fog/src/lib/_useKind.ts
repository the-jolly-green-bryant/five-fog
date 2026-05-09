import {useEffect, useState} from 'react'
import {Kind} from './types'

export const useKind = (name: string | null) => {
    const [kind, setKind] = useState<Kind>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!name) {
            setKind(undefined)
            return
        }

        const loadPokemon = async () => {
            setLoading(true)
            setError(null)

            const normalizedName = name
                .toLowerCase()
                .replaceAll(/[^a-zA-Z0-9\- ]/g, '')
                .replaceAll(/\s+/g, '-')
            const response = await fetch(
                `https://pokeapi.co/api/v2/type/${normalizedName}`,
            )

            if (!response.ok) {
                setKind(undefined)
                setError(new Error('Failed to load pokemon'))
                return
            }

            const data = await response.json()
            setKind(data)
            setLoading(false)
        }

        void loadPokemon()
    }, [name])

    return {kind, loading, error}
}