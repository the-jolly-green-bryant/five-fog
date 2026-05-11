import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react'
import {useParams} from 'react-router'
import {usePokemon} from '../lib/api'
import {Pokemon} from '../lib/types'
import {chevronBack, chevronForward} from 'ionicons/icons'

export type ViewPageProps = {
    staticData?: {
        pokemon: Pokemon,
        error: undefined,
        loading: boolean
    }
}

const ViewPage: React.FC<ViewPageProps> = ({staticData}) => {

    const {name} = useParams<{ name: string; }>()
    const use = usePokemon(name)
    const {pokemon} = staticData ?? use

    return (
        <>
            {pokemon && <>
                <title>{`${pokemon.name} | ${pokemon?.species.genera.find(k => k.language.name == 'en')?.genus} | Five Fog Pokédex`}</title>

                <meta
                    name="description"
                    content={`${pokemon.name} - ${pokemon.species.flavor_text_entries.filter(k => k.language.name == 'en').at(0)?.flavor_text} - Pokémon details, stats, types, and information.`}
                />

                <meta
                    property="og:title"
                    content={`${pokemon.name} | ${pokemon?.species.genera.find(k => k.language.name == 'en')?.genus} | Five Fog Pokédex`}
                />

                <meta
                    property="og:description"
                    content={`${pokemon.name} - ${pokemon.species.flavor_text_entries.filter(k => k.language.name == 'en').at(0)?.flavor_text} - Pokémon details, stats, types, and information.`}
                />

                <link
                    rel="canonical"
                    href={`https://five-fog.bryantjames.com/pokemon/${pokemon.name}`}
                />

                <meta property="og:image"
                      content={pokemon.sprites.other['official-artwork'].front_default || 'https://placehold.co/400'}/>
            </>
            }

            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                            <IonButton href="/">home</IonButton>
                        </IonButtons>

                        <IonTitle>{name}</IonTitle>

                        <IonButtons slot="end">
                            <IonButton href={`/pokemon/${pokemon?.prev.name}`}>
                                <IonIcon icon={chevronBack} aria-label="previous"></IonIcon>
                            </IonButton>
                            <IonButton href={`/pokemon/${pokemon?.next.name}`}>
                                <IonIcon icon={chevronForward} aria-label="next"></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonItem detail={false}>
                        <IonAvatar style={{backgroundColor: pokemon?.species.color.name ?? 'transparent'}}>
                            <img alt={`official artwork for the pokemon ${pokemon?.name ?? name}`}
                                 src={pokemon?.sprites.other['official-artwork'].front_default ?? 'https://placehold.co/400'}/>
                        </IonAvatar>

                        <IonLabel>
                            <h1>{pokemon?.name ?? name}</h1>
                            <p>#{pokemon?.id ?? '??'} - {pokemon?.species.genera.find(k => k.language.name == 'en')?.genus ?? '??'}</p>
                        </IonLabel>
                    </IonItem>

                    {pokemon && (
                        <IonItem>
                            <p>{pokemon.species.flavor_text_entries.filter(k => k.language.name == 'en').at(0)?.flavor_text}</p>
                        </IonItem>
                    )}

                    {pokemon && pokemon.types.map((k, idx) => (
                        <IonItem href={`/type/${k.type.name}`} detail={true} key={`type_${idx}`}>
                            {k.type.name}
                        </IonItem>
                    ))}
                </IonContent>
            </IonPage>
        </>
    )
}

export default ViewPage
