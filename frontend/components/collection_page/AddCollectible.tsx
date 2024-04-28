import { useMutation } from '@tanstack/react-query'
import { PCollection } from './collections';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAuth } from '@clerk/clerk-react';
import { post } from '../../api/api';
import { getProductImage } from "../../utils/images";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AddCollectible = ({collectible, id, editable}: {collectible: PCollection; id: string | undefined; editable: boolean;}) => {
  const { getToken } = useAuth();
  
  const toggleColletion = async (collectible: PCollection) => {
    if (id === undefined) return;
    collectible.owned = !collectible.owned;
    const token = await getToken();
    await post(`profiles/collection/?id=${id}&cId=${collectible.id}`, {}, token);
  }
  const mutationAdd = useMutation({
    mutationFn: toggleColletion,
  })
  
  const toggleWishlist = async (collectible: PCollection) => {
    if (id === undefined) return;
    collectible.wishlisted = !collectible.wishlisted;
    const token = await getToken();
    await post(`profiles/wishlist/?id=${id}&cId=${collectible.id}`, {}, token);
  }
  
  const mutation = useMutation({
    mutationFn: toggleWishlist,
  })
  
  return (
    <div
      className="h-full flex"
      key={collectible.id}
    >
      <div key={collectible.id} className="w-full p-4 flex flex-col items-center"> 
          <div className="w-24 h-24 xs:h-28 xs:w-28 md:w-[130px] md:h-[130px] lg:h-48 lg:w-48">
              <img src={getProductImage(collectible.image)} style={{ opacity: collectible.owned ? 1 : 0.3 }} className="w-full h-full object-contain rounded-lg" alt={collectible.name} />
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="text-center">{collectible.name}</div>
            <div className="flex w-full justify-evenly">
              { editable && <div onClick = {() => mutation.mutate(collectible)}> 
                  {collectible.wishlisted ? <FavoriteIcon fontSize="large" className = "text-pink-400" /> : <FavoriteBorderIcon fontSize="large" className = "text-pink-400" />}
              </div> }
                { editable && <div onClick = {() => mutationAdd.mutate(collectible)}> 
                  { collectible.owned ? <RemoveIcon fontSize='large'/> : <AddIcon fontSize='large'/>}
                </div> }
            </div>
          </div>
      </div>
    </div>
  )
}
export default AddCollectible;