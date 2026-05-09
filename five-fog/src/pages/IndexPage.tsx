import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {useListPokemon} from "../lib/api"

const IndexPage: React.FC<{ kind?: string }> = ({kind}) => {
    const title = `${kind ?? 'all'} pokemon`
    const {list, error, loading} = useListPokemon(kind)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <pre>
                    Error: {error?.message}
                    Loading: {loading}
                    Pokemon: {JSON.stringify(list, null, 4)}
                </pre>
            </IonContent>
        </IonPage>
    );
};

export default IndexPage;
