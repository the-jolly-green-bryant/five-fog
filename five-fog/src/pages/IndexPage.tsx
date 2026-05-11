import {
    IonButtons,
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonList,
    IonMenuButton,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from '@ionic/react'
import {useListPokemon, usePokemonByType} from '../lib/api'
import {useState} from 'react'
import IndexItem from '../components/IndexItem'

const IndexPage: React.FC<{ kind?: string }> = ({kind}) => {
    const [search, setSearch] = useState('')
    // TODO - Better ways to handle this switch.
    const allPokemon = useListPokemon({search})
    const typedPokemon = usePokemonByType({name: kind ?? 'fire', search})
    console.log('kind', JSON.stringify(kind))
    const {list, loading, loadMore} = kind ? typedPokemon : allPokemon

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
                    <IonTitle>
                        <IonSearchbar debounce={600} onIonInput={onSearch}></IonSearchbar>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {kind && (
                    <IonItem>Filtering by type `{kind}`</IonItem>
                )}

                <IonList>
                    {list && list.map((k) => (
                        <IndexItem name={k.name} key={'index__pokemon_' + k.name}/>
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
