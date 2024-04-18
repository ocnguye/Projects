import StarIcon from '@mui/icons-material/Star';
import StarHalf from '@mui/icons-material/StarHalf';
import StarBorder from '@mui/icons-material/StarBorder';

const renderRating = (rating: number, size: any ="medium") => {
    let stars = []; 
    let i = 5;
    while (i > 0) {
        if (rating >= 1) stars.push(<StarIcon key={i} fontSize={size} color="success"/>);
        else if (rating >= 0.5) stars.push(<StarHalf key={i} fontSize="small" color="success"/>);
        else stars.push(<StarBorder fontSize="small" key={i} color="success"/>);
        i--;
        rating--;
    }
    return stars;
}

export {
    renderRating,
}