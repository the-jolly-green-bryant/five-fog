import { useEffect, useState } from 'react';
import { Pokemon } from './types';

export const usePokemon = (name: string | null) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!name) {
            setPokemon(null);
            return;
        }

        const loadPokemon = async () => {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`,
            );

            if (!response.ok) {
                setPokemon(null)
                setError(new Error('Failed to load pokemon'))
                return
            }

            const data = await response.json();
            setPokemon(data);
            setLoading(false);
        };

        void loadPokemon();
    }, [name]);

    return {pokemon, loading, error};
}