const Collection = () => {
    // load data from the api
    // need bubbled 'Collection' header
    // green background square
    // square images of the users collection
    // render the data
    return (
        <div
        className=" bg-green-500
        flex flex-col items-center justify-center"
        style={{
            float: 'left',
            width: '47%',
            height: '450px',
            borderRadius: '20px',
            margin: '15px',
            backgroundColor: '#C3F49D'
        }}
    >
        <p> This is my collection! </p>
        </div>
    );
}

export default Collection;