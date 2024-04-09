export const cleanImage = ( image: string ) => {
    const cdn = "https://d3jvwclgjetaaw.cloudfront.net/";
    image = image.replace("[", "").replace("]", "").replace("'", "").replace("'", "").split(" ")[0].replace(",", "");
    image = cdn + image.split("/")[image.split("/").length - 1];
    return image;
}