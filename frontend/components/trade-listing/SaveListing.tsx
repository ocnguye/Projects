import { Listing } from "../../api/search";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { post, get } from '../../api/api'
import { useAuth } from "@clerk/clerk-react";

type SaveData = {
  saved: boolean;
}

const SaveListing = ({ listing }: { listing: Listing }) => {
  const { getToken } = useAuth();
  const { data, isLoading, isError } = useQuery<SaveData>({
    queryKey: ['saveListing', listing.id],
    queryFn: async () => {
      const token = await getToken();
      const resp = await get(`profiles/saved/?id=${listing.id}`, token);
      return resp?.data;
    }
  });

  const toggleSaved = async () => {
    const token = await getToken();
    const resp = await post(`profiles/saved/?id=${listing.id}`, {}, token);
    return resp?.data;
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: toggleSaved,
    onSuccess: (data) => {
      queryClient.setQueryData(['saveListing', listing.id], data)
      queryClient.invalidateQueries({ queryKey: ['savedListings'] })
    },

  });

  const Icon = () => {
    if (isLoading || isError) {
      return (
        <BookmarkBorderIcon fontSize='large' />
      )
    }
    if (data?.saved) {
      return (
        <BookmarkIcon fontSize='large' />
      )
    }
    return (
      <BookmarkBorderIcon fontSize='large' />
    )
  }

  return (
    <div
      onClick={() => mutation.mutate()}
    >
      <Icon />
    </div>
  )
}

export default SaveListing;