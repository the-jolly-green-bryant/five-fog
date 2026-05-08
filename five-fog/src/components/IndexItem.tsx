import './IndexItem.scss';

interface ContainerProps {
    name: string;
}

const IndexItem: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div id="container">
            <strong>{name}</strong>
            <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
        </div>
    );
};

export default IndexItem;
