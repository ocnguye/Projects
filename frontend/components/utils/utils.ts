const formatSeries = (series: string) => {
    if (series.includes("-")) {
        return series.split("-")[0].toUpperCase()[0] + series.split("-")[0].substring(1) + " " + series.split("-")[1].toUpperCase()[0] + series.split("-")[1].substring(1);
    }
    return series.toUpperCase()[0] + series.substring(1) + " Series";
}

const cleanImage = ( image: string ) => {
    const cdn = "https://d3jvwclgjetaaw.cloudfront.net/";
    image = image.replace("[", "").replace("]", "").replace("'", "").replace("'", "").split(" ")[0].replace(",", "");
    image = cdn + image.split("/")[image.split("/").length - 1];
    return image;
}

export { formatSeries, cleanImage };
