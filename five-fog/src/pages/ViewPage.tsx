import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {useParams} from 'react-router';
import {usePokemon} from "../lib/api"

const ViewPage: React.FC = () => {

    const {name} = useParams<{ name: string; }>()
    const {pokemon, error, loading} = usePokemon(name)

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

export default ViewPage;
