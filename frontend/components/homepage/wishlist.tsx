
const Wishlist = () => {
    const data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 40));
    const width = 150;
    
    return (
        <div style={{ display: 'flex', width: width*data.length }}>
            {data.map((item: any, index: any) => (
                <div
                    className="bg-green-100"
                    key={index}
                    style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '10px',
                        margin: '5px',
                    }}
                >
                    {item}
                </div>
            ))}
        </div>
    );
};

export default Wishlist;