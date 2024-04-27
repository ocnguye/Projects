import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PCollection } from './collections';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAuth } from '@clerk/clerk-react';
import { post } from '../../api/api';

const AddCollectible = ({collectible, id}: {collectible: PCollection; id: string | undefined;}) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  
  const toggleColletion = async () => {
    if (id === undefined) return;
    const token = await getToken();
    const resp = await post(`profiles/collection/?id=${id}&cId=${collectible.id}`, {}, token);
    return resp?.data;
  }
  const mutation = useMutation({
    mutationFn: toggleColletion,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['pCollection', id]});
    }
  })
  
  return (
    <div
      onClick={() => mutation.mutate()}
    >
      {collectible.owned ? 
        <RemoveIcon fontSize='large'/> :
        <AddIcon fontSize='large'/>
      }
    </div>
  )
}
export default AddCollectible;