import { useEffect, useState } from 'react';
import { Pokemon } from './types';

export const useListPokemon = () => {
    const [list, setList] = useState<Pokemon[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadPokemon = async () => {
            setLoading(true);
            setError(null);

            const response = await fetch(
                'https://pokeapi.co/api/v2/pokemon'
            );

            if (!response.ok) {
                setList(null)
                setError(new Error('Failed to load pokemon'))
                return
            }

            const data = await response.json();
            setList(data);
            setLoading(false);
        };

        void loadPokemon();
    }, []);

    return {list, loading, error};
}