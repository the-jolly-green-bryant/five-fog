import {
    IonAvatar,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonSelect,
    IonSelectOption,
} from '@ionic/react'

import {useLocation} from 'react-router-dom'
import './Menu.scss'
import {useListKinds} from '../lib/api'
import KindItem from './KindItem'
import {LanguageCode, LANGUAGES, useLanguage} from '../lib/language'

const LanguageSelector = () => {
    const {language, setLanguage} = useLanguage()

    return (
        <IonSelect
            value={language}
            onIonChange={event => setLanguage(event.detail.value as LanguageCode)}
        >
            {LANGUAGES.map(code => (
                <IonSelectOption key={code} value={code}>
                    {code.toUpperCase()}
                </IonSelectOption>
            ))}
        </IonSelect>
    )
}

const Menu: React.FC = () => {
    const location = useLocation()
    const {list, loading} = useListKinds()

    return (
        <IonMenu contentId="main" type="overlay">
            <IonHeader>
                {LanguageSelector()}
            </IonHeader>

            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Five Fog</IonListHeader>
                    <IonNote>bryant@bryantjames.com</IonNote>
                    <IonMenuToggle key={'kind_all'} autoHide={false}>
                        <IonItem detail={true} href={`/`} className={location.pathname === '/' ? 'selected' : ''}
                                 routerLink={'/'} routerDirection="none" lines="none">
                            <IonAvatar className={'typeIcon'}>
                                <img alt={'a placeholder image'} src={'https://placehold.co/400'}/>
                            </IonAvatar>

                            <IonLabel>All</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                    {!loading && list && list.filter(k => !['stellar', 'unknown', 'shadow'].includes(k.name.toLowerCase())).map((kind) => {
                        return (
                            <IonMenuToggle key={'kind_' + kind.name} autoHide={false}>
                                <KindItem name={kind.name}/>
                            </IonMenuToggle>
                        )
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menu
