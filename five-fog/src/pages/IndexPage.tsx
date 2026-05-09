import {
    IonButtons,
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react'
import {useListPokemon} from '../lib/api'

const IndexPage: React.FC<{ kind?: string }> = ({kind}) => {
    const title = `${kind ?? 'all'} pokemon`
    // TODO - Filtering
    const {list, error, loading, loadMore, hasMore} = useListPokemon()

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
                {loading && <span>Loading</span>}
                {/*    TODO - If we reach bottom and hasMore, call load more */}

                <IonInfiniteScroll
                    disabled={!hasMore || loading}
                    onIonInfinite={async (event) => {
                        await loadMore()
                        await event.target.complete()
                    }}
                >
                    <IonInfiniteScrollContent
                        loadingText="Loading more Pokémon..."
                    />
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    )
}

export default IndexPage
