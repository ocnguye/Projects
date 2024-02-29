import { useParams } from 'react-router-dom';

const TradeListing = () => {
    let { id } = useParams();

    return (
        <div>
            <p>Trade Listing: {id}</p>
        </div>
    );
}

export default TradeListing;