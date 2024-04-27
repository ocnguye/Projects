const getProductImage = (image: string) => {
    image = image.replace(/https:\/\/smiski.com\/e/g, '');
    image = image.trim()
    if (image.includes("http")) return image;
    image = `https://smiski.com/e` + "" + image;
    return image;
}

const cleanImage = ( image: string ) => {
    const cdn = "https://d3jvwclgjetaaw.cloudfront.net/";
    image = image.replace("[", "").replace("]", "").replace("'", "").replace("'", "").split(" ")[0].replace(",", "");
    image = cdn + image.split("/")[image.split("/").length - 1];
    return image;
}

export {
    getProductImage,
    cleanImage,
}
