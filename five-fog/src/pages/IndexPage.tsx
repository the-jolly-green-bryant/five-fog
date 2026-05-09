import {
    IonButtons,
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonMenuButton,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from '@ionic/react'
import {useListPokemon} from '../lib/api'
import {useState} from 'react'
import IndexItem from '../components/IndexItem'

const IndexPage: React.FC<{ kind?: string }> = ({kind}) => {
    const [search, setSearch] = useState('')
    const title = `${kind ?? 'all'} pokemon`
    // TODO - Filtering
    const {list, loading, loadMore} = useListPokemon({search})

    const onSearch = (event: Event) => {
        const query = (event.target as HTMLIonSearchbarElement)?.value?.toLowerCase()
        setSearch(query ?? '')
    }

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
                <IonSearchbar debounce={1000} onIonInput={onSearch}></IonSearchbar>

                <IonList>
                    {list && list.map((k) => (
                        <IndexItem name={k.name} key={'pokemon_' + k.name}/>
                    ))}
                </IonList>

                <IonInfiniteScroll
                    disabled={loading}
                    onIonInfinite={async (event) => {
                        await loadMore()
                        await event.target.complete()
                    }}
                >
                    <IonInfiniteScrollContent loadingText="Loading..."
                                              loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    )
}

export default IndexPage
