import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import {useParams} from 'react-router'
import {usePokemon} from '../lib/api'
import {Pokemon} from '../lib/types'

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
    const {pokemon, error, loading} = staticData ?? use

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <pre>
                    Error: {error?.message}
                    Loading: {loading}
                    Pokemon: {JSON.stringify(pokemon, null, 4)}
                </pre>
            </IonContent>
        </IonPage>
    )
}

export default ViewPage
