import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';

export type FavoriteData = {
    favorite: boolean;
}

type FavoriteProps = {
    id: string | undefined;
}

const Favorite = ({id} : FavoriteProps) => {

    const handleFavorite = () => {
        console.log(id);
        return (
            <Tooltip title="Add to Favorites" arrow>
                <div>
                    <FavoriteBorderIcon fontSize='large' />
                </div>
            </Tooltip>
        )
    }

    return (
        <div>
            {handleFavorite()}
        </div>
    )

}

export default Favorite;