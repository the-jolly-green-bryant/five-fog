import './IndexItem.scss'
import {IonItem} from '@ionic/react'

interface ContainerProps {
    name: string;
}

const IndexItem: React.FC<ContainerProps> = ({name}) => {
    return (
        <IonItem>{name}</IonItem>
    )
}

export default IndexItem
