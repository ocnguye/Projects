
const getProductImage = (image: string) => {
    console.log(image)
    image = image.replace(/https:\/\/smiski.com\/e/g, '');
    image = image.trim()
    image = `https://smiski.com/e` + "" + image;
    return image;
}

export {
    getProductImage
}