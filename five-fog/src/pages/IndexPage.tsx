import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';

const IndexPage: React.FC<{ filter?: string }> = ({filter}) => {

    const title = `${filter ?? 'all'} pokemon`
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
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonContent>
        </IonPage>
    );
};

export default IndexPage;
