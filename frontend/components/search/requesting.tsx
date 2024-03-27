import { Collectible } from '../../api/search';

type RequestingProps = {
    data: Collectible[];
};

const Requesting = ({data}: RequestingProps) => {
    return (
    <div
    style={{
        display: 'flex',
        flexDirection: 'column',
        height: "150px"
    }}
    >
        {data.map((collectible: Collectible) => (
            <div
                style={{
                    width: '50px',
                }}
            >
                <img src={collectible?.image} style={{height: "100%"}}/>
            </div>
        ))}
    </div>
    )
}

export default Requesting;