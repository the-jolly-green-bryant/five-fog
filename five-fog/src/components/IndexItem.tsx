import './IndexItem.scss'
import {IonAvatar, IonItem, IonLabel} from '@ionic/react'
import {usePokemon} from '../lib/api'

interface ContainerProps {
    name: string;
}

const DEFAULT_IMAGE = 'https://placehold.co/400'

const IndexItem: React.FC<ContainerProps> = ({name}) => {
    const {pokemon, loading} = usePokemon(name)
    const display = !loading && pokemon ? {
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default || DEFAULT_IMAGE,
        alt: `Official artwork for the Pokemon ${pokemon.name}`
    } : {
        name,
        image: DEFAULT_IMAGE,
        alt: 'A placeholder image'
    }

    return (
        <IonItem detail={true} href={`/pokemon/${display.name}`}>
            <IonAvatar>
                <img alt={display.alt} src={display.image}/>
            </IonAvatar>

            <IonLabel>{display.name}</IonLabel>
        </IonItem>
    )
}

export default IndexItem
