const getProductImage = (image: string) => {
        image = image.replace(/https:\/\/smiski.com\/e/g, '');
        image = image.trim()
        if (image.includes("http")) return image;
        image = `https://smiski.com/e` + "" + image;
        return image;
    }
    
    export {
        getProductImage
    }