import './IndexItem.scss'
import {IonAvatar, IonItem, IonLabel} from '@ionic/react'
import {usePokemon} from '../lib/api'
import {useLanguage} from '../lib/language'

interface ContainerProps {
    name: string;
}

const DEFAULT_IMAGE = 'https://placehold.co/400'

const IndexItem: React.FC<ContainerProps> = ({name}) => {
    const {language} = useLanguage()
    const {pokemon, loading} = usePokemon(name)
    const display = !loading && pokemon ? {
        name: pokemon.species.names.find(i => i.language.name == language)?.name,
        image: pokemon.sprites.other['official-artwork'].front_default || DEFAULT_IMAGE,
        alt: `Official artwork for the Pokemon ${pokemon.name}`
    } : {
        name,
        image: DEFAULT_IMAGE,
        alt: 'A placeholder image'
    }

    return (
        <IonItem detail={true} href={`/pokemon/${pokemon?.name}`}>
            <IonAvatar style={{backgroundColor: pokemon?.species.color.name ?? 'transparent'}}>
                <img alt={display.alt} src={display.image}/>
            </IonAvatar>

            <IonLabel>
                <h1>{display.name}</h1>
                {pokemon && (
                    <p>#{pokemon.id} - {pokemon.types.map(k => k.type.name).join(', ')}</p>
                )}
            </IonLabel>
        </IonItem>
    )
}

export default IndexItem
