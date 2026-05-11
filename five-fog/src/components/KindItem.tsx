import './IndexItem.scss'
import {IonAvatar, IonItem, IonLabel} from '@ionic/react'
import {useKind} from '../lib/_useKind'
import {useLanguage} from '../lib/language'

interface ContainerProps {
    name: string;
}

const DEFAULT_IMAGE = 'https://placehold.co/400'

const KindItem: React.FC<ContainerProps> = ({name}) => {
    const {language} = useLanguage()
    const {kind, loading} = useKind(name)
    const display = !loading && kind ? {
        name: kind.names.find(k => k.language.name == language)?.name ?? name,
        image: `https://raw.githubusercontent.com/HybridShivam/Pokemon/refs/heads/master/assets/Others/type-icons/${kind.name}.svg`,
        alt: `Official artwork for the type ${kind.name}`
    } : {
        name,
        image: DEFAULT_IMAGE,
        alt: 'A placeholder image'
    }

    const url = `/type/${name}`

    return (
        <IonItem detail={true} href={`/type/${name}`} className={location.pathname === url ? 'selected' : ''}
                 routerLink={url} routerDirection="none" lines="none">
            <IonAvatar className={'typeIcon'}>
                <img alt={display.alt} src={display.image}/>
            </IonAvatar>

            <IonLabel>{display.name}</IonLabel>
        </IonItem>
    )
}

export default KindItem
